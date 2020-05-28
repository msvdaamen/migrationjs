


export class ForeignColumn {
    private keyName: string;

    constructor(private keys: string[]) {}



    toString() {
        return `CONSTRAINT ${this.keys.join('_') + '_pk'} PRIMARY KEY (${this.keys.join(', ')})`;
    }
}
