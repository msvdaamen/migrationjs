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
    static table(name: string) {

    }

    private static async runCreate(name: string, blueprint: Blueprint) {
        const columnStrings = blueprint.getColumns().map(column => column.toString());
        const constraintStrings = blueprint.getConstraints().map(column => column.toString());
        const tables = [...columnStrings, ...constraintStrings].join(',');
        const createString = `create table ${name} (${tables})`;
        await query(createString);
    }


}
