import {Column} from "../column";


export class DecimalColumn extends Column {

    constructor(name: string, length: number = null, decimalLength: number = null) {
        super(name, 'decimal');
        this.setLength(length, decimalLength);
    }

    setLength(length: number, decimalLength: number = null): this {
        return super.setLength(length, decimalLength);
    }

    unsigned() {
        this.addAttribute('UNSIGNED');
        return this;
    }
}
