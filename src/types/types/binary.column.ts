import {Column} from "../column";

export class BinaryColumn extends Column {
    constructor(name: string, length: number) {
        super(name, 'binary');
        this.setLength(length);
    }
}
