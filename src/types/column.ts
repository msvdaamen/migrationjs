import {ExpressionInterface} from "../interfaces/expression.interface";
import {Schema} from "../main/schema";

export class Column {
    private isNullable = false;
    protected length: number | string = null;
    private defaultValue: string | number | boolean | ExpressionInterface = null;
    private attributes = new Set<string>();
    private changed = false;
    private afterColumn: string = null;
    private generatedAsExpression: string = 'GENERATED';

    constructor(
        private name: string,
        private type: string
    ) {}

    change() {
        this.changed = true;
        return this;
    }

    after(after: string) {
        this.afterColumn = after;
        return this
    }

    default(defaultValue: string | number | boolean | ExpressionInterface) {
        this.defaultValue = defaultValue;
        return this;
    }

    nullable() {
        this.isNullable = true;
        return this;
    }

    unique() {
        return this.addAttribute('UNIQUE');
    }

    generatedAs(expression: string = 'IDENTITY') {
        return this.addAttribute(`GENERATED ${this.generatedAsExpression} AS ${expression}`);
    }

    always() {
        this.generatedAsExpression = 'ALWAYS';
        return this;
    }


    setLength(length: number | string, decimalLength: number = null) {
        if (length && decimalLength) {
            this.length = `${length},${decimalLength}`;
        } else {
            this.length = length;
        }
        return this;
    }

    protected addAttribute(attribute: string) {
        this.attributes.add(attribute);
        return this;
    }

    toString() {
        let columnString = `${Schema.enQuote(this.name)} ${this.type}`
        if (this.length) {
            columnString += ` (${this.length})`
        }

        if (this.attributes.size > 0) {
            columnString += ' ' + [...Array.from(this.attributes)].join(' ');
        }

        if (!this.isNullable) {
            // columnString += ` NOT NULL`;
        }

        if (this.defaultValue || typeof this.defaultValue === 'boolean' || typeof this.defaultValue === 'number') {
            if (typeof this.defaultValue === 'string') {
                columnString += ` DEFAULT '${this.defaultValue}'`;
            } else if (typeof this.defaultValue === 'object') {
                if (this.defaultValue.hasOwnProperty('expression')) {
                    columnString += ` DEFAULT ${this.defaultValue.expression}`;
                }
            } else {
                columnString += ` DEFAULT ${this.defaultValue}`;
            }
        }
        return columnString;
    }

    toStringAlter() {
        let columnString = '';

        if(this.changed) {
            columnString += 'MODIFY '
        } else {
            columnString += 'ADD '
        }

        columnString += `${Schema.enQuote(this.name)} ${this.type}`;
        if (this.length) {
            columnString += ` (${this.length})`
        }

        if (this.attributes.size > 0) {
            columnString += ' ' + [...Array.from(this.attributes)].join(' ');
        }

        if (!this.isNullable) {
            columnString += ` NOT NULL`;
        }

        if (this.defaultValue || typeof this.defaultValue === 'boolean' || typeof this.defaultValue === 'number') {
            if (typeof this.defaultValue === 'string') {
                columnString += ` DEFAULT '${this.defaultValue}'`;
            } else if (typeof this.defaultValue === 'object') {
                if (this.defaultValue.hasOwnProperty('expression')) {
                    columnString += ` DEFAULT ${this.defaultValue.expression}`;
                }
            } else {
                columnString += ` DEFAULT ${this.defaultValue}`;
            }
        }

        if (this.afterColumn) {
            columnString += ` AFTER ${Schema.enQuote(this.afterColumn)}`
        }

        return columnString;
    }

}
