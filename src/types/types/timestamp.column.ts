import {Column} from "../column";
import {Schema} from "../../main/schema";

export class TimestampColumn extends Column {

    constructor(name: string) {
        super(name, 'timestamp');
    }

    useCurrent() {
        return this.addAttribute('default CURRENT_TIMESTAMP');
    }

    onUpdate() {
        if (Schema.driver.type === 'mysql') {
            return this.addAttribute('ON UPDATE CURRENT_TIMESTAMP');
        }
        return this;
    }
}
