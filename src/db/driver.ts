import {DatabaseConfig} from "../interfaces/database.config";
import {DatabaseDriver} from "../types/database.driver";

export interface Driver {

  init(database: DatabaseConfig): Promise<void>;

  query(query: string, values?: any[]) : Promise<any>;

  getExistingMigrations(): Promise<string[]>;

  checkMigrationTable(): Promise<void>;

  enQuote(str: string): string;

  get type(): DatabaseDriver;

}
