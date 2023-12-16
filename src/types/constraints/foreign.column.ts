import {ConstrainedColumn} from "../constrained.column";


export class ForeignColumn extends ConstrainedColumn {
    private _references: string;
    private _on: string;
    private _onDelete: string;
    private _onUpdate: string;

    constructor(
        private column: string,
        private customName?: string
    ) {
        super();
    }

    public getConstrainName(tableName: string) {
        if (this.customName) {
            return this.customName;
        }
        return `${tableName}_${this.column}_fk`;
    }

    references(references: string) {
        this._references = references;
        return this;
    }

    on(on: string) {
        this._on = on;
        return this;
    }

    onDelete(onDelete: onAction) {
        this._onDelete = onDelete;
        return this;
    }

    onUpdate(onUpdate: onAction) {
        this._onUpdate = onUpdate;
        return this;
    }


    toString(tableName: string) {
        let foreignString = `CONSTRAINT ${this.getConstrainName(tableName)} FOREIGN KEY (${this.column}) REFERENCES ${this._on}(${this._references})`;

        if (this._onUpdate) {
            foreignString += ` ON UPDATE ${this._onUpdate}`;
        }

        if (this._onDelete) {
            foreignString += ` ON DELETE ${this._onDelete}`;
        }
        return foreignString;
    }

    toStringAlter(tableName: string) {
        let foreignString = `ADD CONSTRAINT ${this.getConstrainName(tableName)} FOREIGN KEY (${this.column}) REFERENCES ${this._on}(${this._references})`;

        if (this._onUpdate) {
            foreignString += ` ON UPDATE ${this._onUpdate}`;
        }

        if (this._onDelete) {
            foreignString += ` ON DELETE ${this._onDelete}`;
        }
        return foreignString;
    }
}
type onAction = 'cascade' | 'set null' | 'no action' | 'restrict';
