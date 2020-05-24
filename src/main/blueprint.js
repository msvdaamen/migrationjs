"use strict";
exports.__esModule = true;
exports.Blueprint = void 0;
var column_1 = require("../types/column");
var int_column_1 = require("../types/int-column");
var string_column_1 = require("../types/string.column");
var Blueprint = /** @class */ (function () {
    function Blueprint() {
        this.columns = [];
    }
    // TODO
    Blueprint.prototype.year = function (name) {
    };
    // TODO
    Blueprint.prototype.uuid = function (name) {
    };
    // TODO
    Blueprint.prototype.unsignedTinyInteger = function (name) {
    };
    // TODO
    Blueprint.prototype.unsignedSmallInteger = function (name) {
    };
    // TODO
    Blueprint.prototype.unsignedMediumInteger = function (name) {
    };
    // TODO
    Blueprint.prototype.unsignedInteger = function (name) {
    };
    // TODO
    Blueprint.prototype.unsignedDecimal = function (name, length, decimalLength) {
        if (length === void 0) { length = 8; }
        if (decimalLength === void 0) { decimalLength = 2; }
    };
    // TODO
    Blueprint.prototype.unsignedBigInteger = function (name) {
    };
    // TODO
    Blueprint.prototype.tinyInteger = function (name) {
    };
    // TODO
    Blueprint.prototype.tinyIncrements = function (name) {
    };
    // TODO
    Blueprint.prototype.timestampsTz = function () {
    };
    // TODO
    Blueprint.prototype.timestamps = function () {
    };
    // TODO
    Blueprint.prototype.timestampTz = function (name) {
    };
    // TODO
    Blueprint.prototype.timestamp = function (name) {
    };
    // TODO
    Blueprint.prototype.timeTz = function (name) {
    };
    // TODO
    Blueprint.prototype.time = function (name) {
    };
    // TODO
    Blueprint.prototype.text = function (nam) {
    };
    // TODO
    Blueprint.prototype.smallInteger = function (name) {
    };
    // TODO
    Blueprint.prototype.smallIncrements = function (name) {
    };
    // TODO
    Blueprint.prototype.mediumText = function (name) {
    };
    // TODO
    Blueprint.prototype.mediumInteger = function (name) {
    };
    // TODO
    Blueprint.prototype.mediumIncrements = function (name) {
    };
    // TODO
    Blueprint.prototype.longText = function (name) {
    };
    // TODO
    Blueprint.prototype.integer = function (name) {
    };
    // TODO
    Blueprint.prototype.float = function (name, length, decimalLength) {
        if (length === void 0) { length = 8; }
        if (decimalLength === void 0) { decimalLength = 2; }
    };
    // TODO
    Blueprint.prototype.double = function (name, length, decimalLength) {
        if (length === void 0) { length = 8; }
        if (decimalLength === void 0) { decimalLength = 2; }
    };
    // TODO
    Blueprint.prototype.decimal = function (name, length, decimalLength) {
        if (length === void 0) { length = 8; }
        if (decimalLength === void 0) { decimalLength = 2; }
    };
    // TODO
    Blueprint.prototype.dateTimeTz = function (name) {
    };
    // TODO
    Blueprint.prototype.dateTime = function (name) {
    };
    // TODO
    Blueprint.prototype.date = function (name) {
    };
    // TODO
    Blueprint.prototype.char = function (name) {
    };
    // TODO
    Blueprint.prototype.boolean = function (name) {
    };
    // TODO
    Blueprint.prototype.bigInteger = function (name) {
    };
    // TODO
    Blueprint.prototype.bigIncrements = function (name) {
    };
    // TODO use unsignedBigInteger function
    Blueprint.prototype.foreignId = function (name) {
    };
    Blueprint.prototype.id = function () {
        return this.increments('id');
    };
    Blueprint.prototype.string = function (name, length) {
        if (length === void 0) { length = 181; }
        this.columns.push(new string_column_1.StringColumn(name, length));
        return this.columns[this.columns.length - 1];
    };
    Blueprint.prototype.increments = function (name) {
        this.columns.push(new int_column_1.IntColumn(name, [
            'auto_increment',
            'unsigned'
        ]));
        return this.columns[this.columns.length - 1];
    };
    Blueprint.prototype.column = function (name, type) {
        this.columns.push(new column_1.Column(name, type));
    };
    return Blueprint;
}());
exports.Blueprint = Blueprint;
