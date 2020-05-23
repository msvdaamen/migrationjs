import {Blueprint} from "./blueprint";


export class Schema {

    // creates table
    static create(name: string, create: (blueprint: Blueprint) => void) {
        const blueprint = new Blueprint();
        create(blueprint);
    }


    // alters table
    static table(name: string) {

    }
}
