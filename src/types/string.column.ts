import {Column} from "./column";

export class StringColumn extends Column {

    constructor(name: string, length: number) {
        super(name, 'varchar');
        if (!length) {
            length = 181;
        }
        this.setLength(length);
    }
}
