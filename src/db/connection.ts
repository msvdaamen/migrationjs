import {DatabaseConfig} from "../interfaces/database.config";
import {SQLStatement} from "sql-template-strings";

const SQL = require('sql-template-strings')

const mysql = require('mysql');
let connection = null;
export function setupDbConnection(database: DatabaseConfig) {
    connection = mysql.createConnection({
        host     : database.host,
        user     : database.user,
        password : database.password,
        database : database.database
    });
    connection.connect();
}


function getConnection() {
    return connection;
}

export async function getExistingMigrations() {
    return await query(SQL`select * from migrations order by id DESC`);
}

export async function removeAllTables() {

    await query(SQL`SET FOREIGN_KEY_CHECKS = 0;`);
    const result = await query(SQL`select table_name from information_schema.tables where table_schema = 'test_migrations'`);
    for(let i = 0; i < result.length; i++) {
        const tableName = result[i].table_name;
        await query(`DROP TABLE IF EXISTS ${tableName};`);
    }
}


export function query(query: string | SQLStatement): Promise<any> {
    return new Promise((resolve, reject) => {
        getConnection().query(query, (error: any, results: any, fields: any) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
            return;
        })
    })
}


export async function checkMigrationTable() {
    const result = await query(`show tables like 'migrations'`);
    if (result.length === 0) {
        await query(SQL`
            create table migrations (
               id int(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
               migration varchar(191) NOT NULL,
               batch int(11) NOT NULL
            )`)
    }
}

export default getConnection;
