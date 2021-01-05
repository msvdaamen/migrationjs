import {Column} from "../column";


export class BooleanColumn extends Column {

    constructor(name: string) {
        super(name, 'boolean');
    }

    default(defaultValue: boolean | 0 | 1): this {
        if (typeof defaultValue === 'boolean') {
            defaultValue = defaultValue ? 1 : 0;
        } else if (typeof defaultValue === 'number') {
            if (defaultValue > 1) {
                defaultValue = 1;
            }
        }
        return super.default(defaultValue);
    }
}
