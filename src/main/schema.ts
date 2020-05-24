import {Blueprint} from "./blueprint";


export class Schema {

    // creates table
    static create(name: string, create: (blueprint: Blueprint) => void) {
        const blueprint = new Blueprint();
        create(blueprint);

        const columnStrings = blueprint.getColumns().map(column => column.toString());
        const createString = `create table ${name} (${columnStrings.join(',')})`;
        console.log(createString);
    }


    // alters table
    static table(name: string) {

    }
}
