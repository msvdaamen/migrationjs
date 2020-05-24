import { Blueprint } from "./blueprint";
export declare class Schema {
    static create(name: string, create: (blueprint: Blueprint) => void): void;
    static table(name: string): void;
}
