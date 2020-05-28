"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkMigrationTable = exports.query = exports.removeAllTables = exports.setupDbConnection = void 0;
var mysql = require('mysql');
var connection = null;
function setupDbConnection(database) {
    connection = mysql.createConnection({
        host: database.host,
        user: database.user,
        password: database.password,
        database: database.database
    });
    connection.connect();
}
exports.setupDbConnection = setupDbConnection;
function getConnection() {
    return connection;
}
function removeAllTables() {
    return __awaiter(this, void 0, void 0, function () {
        var result, i, tableName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, query('SET FOREIGN_KEY_CHECKS = 0;')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, query("select table_name from information_schema.tables where table_schema = 'test_migrations'")];
                case 2:
                    result = _a.sent();
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < result.length)) return [3 /*break*/, 6];
                    tableName = result[i].table_name;
                    return [4 /*yield*/, query("DROP TABLE IF EXISTS " + tableName + ";")];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 3];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.removeAllTables = removeAllTables;
function query(query, params) {
    if (params === void 0) { params = []; }
    return new Promise(function (resolve, reject) {
        getConnection().query(query, params, function (error, results, fields) {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
            return;
        });
    });
}
exports.query = query;
function checkMigrationTable() {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, query("show tables like 'migrations'")];
                case 1:
                    result = _a.sent();
                    if (!(result.length === 0)) return [3 /*break*/, 3];
                    return [4 /*yield*/, query("\n            create table migrations (\n               id int(10) UNSIGNED NOT NULL,\n               migration varchar(191) NOT NULL,\n               batch int(11) NOT NULL\n            )")];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.checkMigrationTable = checkMigrationTable;
exports.default = getConnection;
