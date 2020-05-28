import { DatabaseConfig } from "../index";
export declare function setupDbConnection(database: DatabaseConfig): void;
declare function getConnection(): any;
export declare function removeAllTables(): Promise<void>;
export declare function query(query: string, params?: Object | Array<string | number | boolean>): Promise<any>;
export declare function checkMigrationTable(): Promise<void>;
export default getConnection;
