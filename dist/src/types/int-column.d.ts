import { Column } from "./column";
export declare class IntColumn extends Column {
    constructor(name: string);
    autoincrement(): this;
    unsigned(): this;
}
