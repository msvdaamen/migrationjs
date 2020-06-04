import {ConstrainedColumn} from "../constrained.column";


export class IndexColumn extends ConstrainedColumn {

    private name: string[];

    constructor(name: string | string[]) {
        super();
        if (!Array.isArray(name)) {
            name = [name];
        }
        this.name = name;
    }

    toString(): string {
        return `INDEX (${this.name.join(', ')})`;
    }
}
