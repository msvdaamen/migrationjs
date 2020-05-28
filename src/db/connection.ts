import {DatabaseConfig} from "../index";

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

export async function removeAllTables() {

    await query('SET FOREIGN_KEY_CHECKS = 0;');
    const result = await query(`select table_name from information_schema.tables where table_schema = 'test_migrations'`);
    for(let i = 0; i < result.length; i++) {
        const tableName = result[i].table_name;
        await query(`DROP TABLE IF EXISTS ${tableName};`);
    }
}


export function query(query: string, params: Object | Array<string | number | boolean> = []): Promise<any> {
    return new Promise((resolve, reject) => {
        getConnection().query(query, params, (error: any, results: any, fields: any) => {
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
        await query(`
            create table migrations (
               id int(10) UNSIGNED NOT NULL,
               migration varchar(191) NOT NULL,
               batch int(11) NOT NULL
            )`)
    }
}

export default getConnection;
