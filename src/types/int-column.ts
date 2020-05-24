import {Column} from "./column";


export class IntColumn extends Column {

    constructor(name: string) {
        super(name, 'int');
    }
}
