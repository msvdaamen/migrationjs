import {Column} from "../column";


export class FloatColumn extends Column {

    constructor(name: string, length: number = null, decimalLength: number = null) {
        super(name, 'float');
        this.setLength(length, decimalLength);
    }

    setLength(length: number, decimalLength: number = null): this {
        return super.setLength(length, decimalLength);
    }
}
