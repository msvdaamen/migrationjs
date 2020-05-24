


export class Column {
    private isNullable = false;
    private length: number = null;

    constructor(
        private name: string,
        private type: string
    ) {}


    nullable() {
        this.isNullable = true;
        return this;
    }

    setLength(length: number) {
        this.length = length;
        return this;
    }

    toString() {
        return `${this.name}`
    }

}
