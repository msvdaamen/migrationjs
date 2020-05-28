export declare class Column {
    private name;
    private type;
    private isNullable;
    private length;
    private defaultValue;
    private attributes;
    constructor(name: string, type: string);
    default(defaultValue: string | number | boolean): this;
    nullable(): this;
    setLength(length: number): this;
    protected addAttribute(attribute: string): void;
    toString(): string;
}
