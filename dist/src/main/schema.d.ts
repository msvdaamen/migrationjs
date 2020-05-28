import { Blueprint } from "./blueprint";
export declare class Schema {
    static create(name: string, create: (blueprint: Blueprint) => void): Promise<void>;
    static table(name: string): void;
    private static run;
}
