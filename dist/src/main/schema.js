"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = void 0;
var blueprint_1 = require("./blueprint");
var Schema = /** @class */ (function () {
    function Schema() {
    }
    // creates table
    Schema.create = function (name, create) {
        var blueprint = new blueprint_1.Blueprint();
        create(blueprint);
        var columnStrings = blueprint.getColumns().map(function (column) { return column.toString(); });
        var createString = "create table " + name + " (" + columnStrings.join(',') + ")";
        console.log(createString);
    };
    // alters table
    Schema.table = function (name) {
    };
    return Schema;
}());
exports.Schema = Schema;
