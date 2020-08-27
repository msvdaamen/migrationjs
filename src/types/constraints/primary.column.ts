import {ConstrainedColumn} from "../constrained.column";

export class PrimaryColumn extends ConstrainedColumn {

    constructor(
        private keys: string[]
    ) {
        super();
    }

    toString(tableName:string): string {
        return `CONSTRAINT ${tableName}_${this.keys.join('_') + '_pk'} PRIMARY KEY (${this.keys.join(', ')})`;
    }
}
