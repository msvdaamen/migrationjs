import {Column} from "../column";


export class CharColumn extends Column {

    constructor(name: string, length: number = 100) {
        super(name, 'char');
        this.setLength(length);
    }
}
