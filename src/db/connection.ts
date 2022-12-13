import {DatabaseConfig} from "../interfaces/database.config";
import * as mysql from "mysql2/promise";
import {Connection} from "mysql2/promise";
import {RowDataPacket} from "mysql2";

let connection: Connection = null;
export async function setupDbConnection(database: DatabaseConfig) {
    connection = await mysql.createConnection({
        host     : database.host,
        user     : database.user,
        password : database.password,
        database : database.database
    });
    await connection.connect();
}


function getConnection() {
    return connection;
}

export async function getExistingMigrations() {
    return await query(`select * from migrations order by id DESC`);
}

export async function removeAllTables() {

    await query(`SET FOREIGN_KEY_CHECKS = 0;`);
    const result = await query(`select table_name from information_schema.tables where table_schema = 'test_migrations'`);
    for(let i = 0; i < result.length; i++) {
        const tableName = result[i].table_name;
        await query(`DROP TABLE IF EXISTS ${tableName}`);
    }
}


export function query(query: string, values: any[] = []): Promise<RowDataPacket[]> {
    return getConnection().query(query, values).then((result) => result[0] as RowDataPacket[]);
}


export async function checkMigrationTable() {
    const result = await query(`show tables like 'migrations'`);
    if (result.length === 0) {
        await query(`
            create table migrations (
               id int(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
               migration varchar(191) NOT NULL,
               batch int(11) NOT NULL
            )`)
    }
}

export default getConnection;
