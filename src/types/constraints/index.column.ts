import {ConstrainedColumn} from "../constrained.column";


export class IndexColumn extends ConstrainedColumn {

    private readonly columns: string[];
    private readonly customName?: string;

    constructor(columns: string | string[], customName?: string) {
        super();
        if (!Array.isArray(columns)) {
            columns = [columns];
        }
        this.columns = columns;
        this.customName = customName;
    }

    private getName(tableName: string) {
        if (this.customName) {
            return this.customName;
        }
        return `${tableName}_${this.columns.join('_')}_idx`;
    }

    toString(tableName: string): string {
        return `CREATE INDEX ${this.getName(tableName)} ON ${tableName} (${this.columns.join(', ')})`;
    }

    toStringAlter(tableName: string) {
        return `ADD INDEX (${tableName}_${this.columns.join(', ')})`;
    }
}
