"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = void 0;
var Column = /** @class */ (function () {
    function Column(name, type) {
        this.name = name;
        this.type = type;
        this.isNullable = false;
        this.length = null;
    }
    Column.prototype.nullable = function () {
        this.isNullable = true;
        return this;
    };
    Column.prototype.setLength = function (length) {
        this.length = length;
        return this;
    };
    Column.prototype.toString = function () {
        return "" + this.name;
    };
    return Column;
}());
exports.Column = Column;
