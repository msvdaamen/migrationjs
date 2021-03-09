import {ConstrainedColumn} from "../constrained.column";

export class PrimaryColumn extends ConstrainedColumn {

    constructor(
        private keys: string[],
        private customName?: string
    ) {
        super();
    }

    private getConstrainName(tableName: string) {
        if (this.customName) {
            return `${tableName}_${this.customName}`;
        }
        return `${tableName}_${this.keys.join('_')}_pk`
    }

    toString(tableName:string): string {
        return `CONSTRAINT ${this.getConstrainName(tableName)} PRIMARY KEY (${this.keys.join(', ')})`;
    }

    toStringAlter(tableName: string) {
        return `ADD CONSTRAINT ${this.getConstrainName(tableName)} PRIMARY KEY (${this.keys.join(', ')})`;
    }
}
