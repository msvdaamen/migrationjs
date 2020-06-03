import {Column} from "../column";


export class BooleanColumn extends Column {

    constructor(name: string) {
        super(name, 'boolean');
    }

    default(defaultValue: boolean): this {
        return super.default(defaultValue);
    }
}
