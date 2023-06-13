import {Column} from "../column";
import {Schema} from "../../main/schema";

export class BooleanColumn extends Column {

    constructor(name: string) {
        super(name, 'boolean');
    }

    default(defaultValue: boolean): this {
        if (Schema.driver.type === 'mysql') {
            return super.default(defaultValue ? 1 : 0);
        }
        return super.default(defaultValue);
    }
}
