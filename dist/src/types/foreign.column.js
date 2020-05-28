"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForeignColumn = void 0;
var ForeignColumn = /** @class */ (function () {
    function ForeignColumn(keys) {
        this.keys = keys;
    }
    ForeignColumn.prototype.toString = function () {
        return "CONSTRAINT " + (this.keys.join('_') + '_pk') + " PRIMARY KEY (" + this.keys.join(', ') + ")";
    };
    return ForeignColumn;
}());
exports.ForeignColumn = ForeignColumn;
