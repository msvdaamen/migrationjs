"use strict";
exports.__esModule = true;
exports.Schema = void 0;
var blueprint_1 = require("./blueprint");
var Schema = /** @class */ (function () {
    function Schema() {
    }
    // creates table
    Schema.create = function (name, create) {
        var blueprint = new blueprint_1.Blueprint();
        create(blueprint);
    };
    // alters table
    Schema.table = function (name) {
    };
    return Schema;
}());
exports.Schema = Schema;
