import {Column} from "../column";

export class TimestampColumn extends Column {

    constructor(name: string) {
        super(name, 'timestamp');
    }

    useCurrent() {
        return this.addAttribute('default CURRENT_TIMESTAMP');
    }

    onUpdate() {
        return this.addAttribute('ON UPDATE CURRENT_TIMESTAMP');
    }
}
