import {Column} from "../column";


export class DoubleColumn extends Column {

    constructor(name: string, length: number = 8, decimalLength: number = 2) {
        super(name, 'double')
        this.setLength(length, decimalLength);
    }

    setLength(length: number, decimalLength: number = null): this {
        return super.setLength(length, decimalLength);
    }
}
