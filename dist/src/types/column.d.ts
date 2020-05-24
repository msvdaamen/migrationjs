export declare class Column {
    private name;
    private type;
    private isNullable;
    private length;
    constructor(name: string, type: string);
    nullable(): this;
    setLength(length: number): this;
    toString(): string;
}
