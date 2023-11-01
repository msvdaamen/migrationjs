import {ConstrainedColumn} from "../constrained.column";
import {Schema} from "../../main/schema";

export class PrimaryColumn extends ConstrainedColumn {

    constructor(
        private keys: string[],
        private customName?: string
    ) {
        super();
    }

    private getConstrainName(tableName: string) {
        if (this.customName) {
            return this.customName;
        }
        return `${tableName}_${this.keys.join('_')}_pk`
    }

    toString(tableName:string): string {
        const columNames = this.keys.map((name) => Schema.enQuote(name)).join(', ');
        return `CONSTRAINT ${this.getConstrainName(tableName)} PRIMARY KEY (${columNames})`;
    }

    toStringAlter(tableName: string) {
        const columNames = this.keys.map((name) => Schema.enQuote(name)).join(', ');
        return `ADD CONSTRAINT ${this.getConstrainName(tableName)} PRIMARY KEY (${columNames})`;
    }
}
