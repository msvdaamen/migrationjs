"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = void 0;
var Column = /** @class */ (function () {
    function Column(name, type) {
        this.name = name;
        this.type = type;
        this.isNullable = false;
        this.length = null;
        this.defaultValue = null;
        this.attributes = [];
    }
    Column.prototype.default = function (defaultValue) {
        this.defaultValue = defaultValue;
        return this;
    };
    Column.prototype.nullable = function () {
        this.isNullable = true;
        return this;
    };
    Column.prototype.setLength = function (length) {
        this.length = length;
        return this;
    };
    Column.prototype.addAttribute = function (attribute) {
        this.attributes.push(attribute);
    };
    Column.prototype.toString = function () {
        var columnString = this.name + " " + this.type;
        if (this.length) {
            columnString += " (" + this.length + ")";
        }
        if (this.attributes.length) {
            columnString += ' ' + this.attributes.join(' ');
        }
        if (!this.isNullable) {
            columnString += " NOT NULL";
        }
        if (this.defaultValue) {
            columnString += " DEFAULT '" + this.defaultValue + "'";
        }
        return columnString;
    };
    return Column;
}());
exports.Column = Column;
