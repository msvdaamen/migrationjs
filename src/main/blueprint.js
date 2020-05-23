"use strict";
exports.__esModule = true;
exports.Blueprint = void 0;
var column_1 = require("../types/column");
var Blueprint = /** @class */ (function () {
    function Blueprint() {
        this.columns = [];
    }
    Blueprint.prototype.column = function (name, type) {
        this.columns.push(new column_1.Column(name, type));
    };
    return Blueprint;
}());
exports.Blueprint = Blueprint;
