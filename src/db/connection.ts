
const mysql = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'test_migrations'
});

connection.connect();


function getConnection() {
    return connection;
}


export function checkMigrationTable() {
    getConnection().query(`show tables like 'migrations'`, function (error: any, results: any, fields: any) {
        if (error) throw error;
        if (results.length === 0) {
            getConnection().query(`
            create table migrations (
               id int(10) UNSIGNED NOT NULL,
               migration varchar(191) NOT NULL,
               batch int(11) NOT NULL
            )`);
        }
    });
}

export function removeAllTables() {
    getConnection().query(`SET FOREIGN_KEY_CHECKS = 0;`)

    getConnection().query(`SELECT table_name FROM information_schema.tables WHERE table_schema = test_migrations`);


    getConnection().query(`SET FOREIGN_KEY_CHECKS = 1;`)
}

export default getConnection;
