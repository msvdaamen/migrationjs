import {Blueprint} from "./blueprint";
import {query} from "../db/connection";


export class Schema {

    // creates table
    static async create(name: string, create: (blueprint: Blueprint) => void) {
        const blueprint = new Blueprint();
        create(blueprint);
        await this.run(name, blueprint);
    }

    // alters table
    static table(name: string) {

    }

    private static async run(name: string, blueprint: Blueprint) {
        const columnStrings = blueprint.getColumns().map(column => column.toString());
        const constraintStrings = blueprint.getConstraints().map(column => column.toString());
        const createString = `create table ${name} (${[...columnStrings, ...constraintStrings].join(',')})`;
        console.log(createString);
        await query(createString);
    }


}
