


export abstract class ConstrainedColumn {

    abstract toString(tableName: string): string;

    abstract toStringAlter(tableName: string): string;
}
