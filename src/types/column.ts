


export class Column {
    private isNullable = false;
    private length: number = null;
    private defaultValue: string | number | boolean = null;
    private attributes = [];

    constructor(
        private name: string,
        private type: string
    ) {}

    default(defaultValue: string | number | boolean) {
        this.defaultValue = defaultValue;
        return this;
    }

    nullable() {
        this.isNullable = true;
        return this;
    }

    setLength(length: number) {
        this.length = length;
        return this;
    }

    protected addAttribute(attribute: string) {
        this.attributes.push(attribute);
    }

    toString() {
        let columnString = `${this.name} ${this.type}`
        if (this.length) {
            columnString += ` (${this.length})`
        }

        if (this.attributes.length) {
            columnString += ' ' + this.attributes.join(' ');
        }

        if (!this.isNullable) {
            columnString += ` NOT NULL`;
        }

        if (this.defaultValue) {
            if (typeof this.defaultValue === 'string') {
                columnString += ` DEFAULT '${this.defaultValue}'`;
            } else {
                columnString += ` DEFAULT ${this.defaultValue}`;
            }
        }
        console.log(columnString);
        return columnString;
    }

}
