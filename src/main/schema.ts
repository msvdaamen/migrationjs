import {Blueprint} from "./blueprint";
import {enQuote, query} from "../db/connection";
import {DatabaseDriver} from "../types/database.driver";
import {Driver} from "../db/driver";
import {IndexColumn} from "../types/constraints/index.column";
import {ConstrainedColumn} from "../types/constrained.column";

export class Schema {
    public static driver: Driver;

    // creates table
    static async create(name: string, create: (blueprint: Blueprint) => void) {
        const blueprint = new Blueprint(name, Schema.driver);
        create(blueprint);
        await this.runCreate(name, blueprint);
    }

    // alters table
    static async table(name: string, alter: (blueprint: Blueprint) => void) {
        const blueprint = new Blueprint(name, Schema.driver);
        alter(blueprint);
        await this.runAlter(name, blueprint);
    }

    static async rename(from: string, to: string) {
        await query(`RENAME TABLE ${from} TO ${to}`)
    }

    static async drop(name: string) {
        await query(`DROP TABLE ${name}`);
    }

    static async dropIfExists(name: string) {
        await query(`DROP TABLE IF EXISTS ${name}`);
    }

    private static async runCreate(name: string, blueprint: Blueprint) {
        if (blueprint.getColumns().length > 0 || blueprint.getConstraints().length > 0) {
            const columnStrings = blueprint.getColumns().map(column => column.toString());
            const indexStrings: string[] = [];
            const constraintStrings: string[] = [];
            for (const column of blueprint.getConstraints()) {
                if (column instanceof IndexColumn) {
                    indexStrings.push(column.toString(name));
                } else {
                    constraintStrings.push(column.toString(name));
                }
            }
            const tables = [...columnStrings, ...constraintStrings].join(',');
            const createString = `create table ${name} (${tables})`;
            await query(createString);
            for (const index of indexStrings) {
                await query(index);
            }
        }
    }

    private static async runAlter(name: string, blueprint: Blueprint) {
        if (blueprint.getColumns().length > 0 || blueprint.getConstraints().length > 0) {
            const columnStrings = blueprint.getColumns().map(column => column.toStringAlter());
            const indexStrings: string[] = [];
            const constraintStrings: string[] = [];
            for (const column of blueprint.getConstraints()) {
                if (column instanceof IndexColumn) {
                    indexStrings.push(column.toString(name));
                } else {
                    constraintStrings.push(column.toString(name));
                }
            }            const tables = [...columnStrings, ...constraintStrings].join(',');
            const createString = `alter table ${name} ${tables}`;
            await query(createString);
            for (const index of indexStrings) {
                await query(index);
            }
        }
        if (blueprint.getForeignDrops().length) {
            for (const column of blueprint.getForeignDrops()) {
                const queryStringForeign = `alter table ${ name } drop foreign key ${enQuote(column)};`;
                const queryStringIndex = `alter table ${name} drop index ${enQuote(column)};`;
                await query(queryStringForeign);
                await query(queryStringIndex);
            }
        }
        if (blueprint.getColumnDrops().length > 0) {
            const columns = blueprint.getColumnDrops().map(columnName => `DROP COLUMN ${enQuote(columnName)}`);
            const queryString = `alter table ${name} ${columns.join(',')}`;
            await query(queryString);
        }
    }

    public static setDriver(driver: Driver) {
        this.driver = driver;
    }
}
