import {Column} from "./column";


export class IntColumn extends Column {

    constructor(name: string, attributes: string[] = []) {
        super(name, 'int', attributes);
    }
}
