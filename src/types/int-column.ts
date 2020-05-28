import {Column} from "./column";


export class IntColumn extends Column {

    constructor(name: string) {
        super(name, 'int');
    }

    autoincrement() {
        this.addAttribute('AUTO_INCREMENT');
        return this;
    }

    unsigned() {
        this.addAttribute('UNSIGNED');
        return this;
    }
}
