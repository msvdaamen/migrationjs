import {ConstrainedColumn} from "../constrained.column";
import {Schema} from "../../main/schema";

export class UniqueColumn extends ConstrainedColumn {


    private readonly name: string[];
    private readonly customName: string;

    constructor(name: string | string[], customName: string = null) {
        super();
        if (!Array.isArray(name)) {
            name = [name];
        }
        this.name = name;
        this.customName = customName;
    }

    toString(tableName:string) {
        const name = this.getName(tableName);
        const columNames = this.name.map((name) => Schema.enQuote(name)).join(', ');
        return `CONSTRAINT ${name} UNIQUE (${columNames})`;
    }

    toStringAlter(tableName: string) {
        const name = this.getName(tableName);
        const columNames = this.name.map((name) => Schema.enQuote(name)).join(', ');
        return `ADD CONSTRAINT ${name} UNIQUE (${columNames})`;
    }

    private getName(tableName: string): string {
        return this.customName ? this.customName : `${tableName}_${this.name.join('_')}_uc`;
    }

}
