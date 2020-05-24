"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.IntColumn = void 0;
var column_1 = require("./column");
var IntColumn = /** @class */ (function (_super) {
    __extends(IntColumn, _super);
    function IntColumn(name, attributes) {
        if (attributes === void 0) { attributes = []; }
        return _super.call(this, name, 'int', attributes) || this;
    }
    return IntColumn;
}(column_1.Column));
exports.IntColumn = IntColumn;
