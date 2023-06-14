import {DatabaseConfig} from "../interfaces/database.config";
import {RowDataPacket} from "mysql2";
import {Driver} from "./driver";
import {MysqlDriver} from "./drivers/mysql.driver";
import {PostgresDriver} from "./drivers/postgres.driver";

let driver: Driver;
export async function setupDbConnection(database: DatabaseConfig): Promise<Driver> {
    switch (database.driver) {
        case 'mysql':
            driver = new MysqlDriver();
            break;
        case 'postgres':
            driver = new PostgresDriver();
            break;
        default:
            throw new Error(`Driver ${database.driver} not supported`);
    }
    await driver.init(database);
    return driver;
}

/**
 * @deprecated Will be removed in 1.0 version. Removed in favor of Schema.query
 * @param query
 * @param values
 */
export function query(query: string, values: any[] = []): Promise<RowDataPacket[]> {
    return driver.query(query, values);
}
