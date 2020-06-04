import {ConstrainedColumn} from "../constrained.column";

export class UniqueColumn extends ConstrainedColumn {


    private name: string[];

    constructor(name: string | string[]) {
        super();
        if (!Array.isArray(name)) {
            name = [name];
        }
        this.name = name;
    }

    toString() {
        return `CONSTRAINT ${this.name.join('_') + '_uc'} UNIQUE (${this.name.join(', ')})`;
    }

}
