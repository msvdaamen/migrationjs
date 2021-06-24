import {Blueprint} from "./blueprint";
import {query} from "../db/connection";

const SQL = require('sql-template-strings')

export class Schema {

    // creates table
    static async create(name: string, create: (blueprint: Blueprint) => void) {
        const blueprint = new Blueprint();
        create(blueprint);
        await this.runCreate(name, blueprint);
    }

    // alters table
    static async table(name: string, alter: (blueprint: Blueprint) => void) {
        const blueprint = new Blueprint();
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
            const constraintStrings = blueprint.getConstraints().map(column => column.toString(name));
            const tables = [...columnStrings, ...constraintStrings].join(',');
            const createString = `create table ${name} (${tables})`;
            await query(createString);
        }
    }

    private static async runAlter(name: string, blueprint: Blueprint) {
        if (blueprint.getColumns().length > 0 || blueprint.getConstraints().length > 0) {
            const columnStrings = blueprint.getColumns().map(column => column.toStringAlter());
            const constraintStrings = blueprint.getConstraints().map(column => column.toStringAlter(name));
            const tables = [...columnStrings, ...constraintStrings].join(',');
            const createString = `alter table ${name} ${tables}`;
            await query(createString);
        }
        if (blueprint.getColumnDrops().length > 0) {
            const columns = blueprint.getColumnDrops().map(columnName => `DROP COLUMN ${columnName}`);
            const queryString = `alter table ${name} ${columns.join(',')}`;
            await query(queryString);
        }

    }


}
