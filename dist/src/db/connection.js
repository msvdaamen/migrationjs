"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAllTables = exports.checkMigrationTable = void 0;
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test_migrations'
});
connection.connect();
function getConnection() {
    return connection;
}
function checkMigrationTable() {
    getConnection().query("show tables like 'migrations'", function (error, results, fields) {
        if (error)
            throw error;
        if (results.length === 0) {
            getConnection().query("\n            create table migrations (\n               id int(10) UNSIGNED NOT NULL,\n               migration varchar(191) NOT NULL,\n               batch int(11) NOT NULL\n            )");
        }
    });
}
exports.checkMigrationTable = checkMigrationTable;
function removeAllTables() {
    getConnection().query("SET FOREIGN_KEY_CHECKS = 0;");
    getConnection().query("SELECT table_name FROM information_schema.tables WHERE table_schema = test_migrations");
    getConnection().query("SET FOREIGN_KEY_CHECKS = 1;");
}
exports.removeAllTables = removeAllTables;
exports.default = getConnection;
