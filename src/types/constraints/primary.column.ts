import {ConstrainedColumn} from "../constrained.column";

export class PrimaryColumn extends ConstrainedColumn {

    constructor(
        private keys: string[]
    ) {
        super();
    }

    toString(): string {
        return `CONSTRAINT ${this.keys.join('_') + '_pk'} PRIMARY KEY (${this.keys.join(', ')})`;
    }
}
