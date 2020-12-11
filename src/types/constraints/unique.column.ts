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

    toString(tableName:string) {
        return `CONSTRAINT ${tableName}_${this.name.join('_') + '_uc'} UNIQUE (${this.name.join(', ')})`;
    }

    toStringAlter(tableName: string) {
        return `ADD CONSTRAINT ${tableName}_${this.name.join('_') + '_uc'} UNIQUE (${this.name.join(', ')})`;
    }

}
