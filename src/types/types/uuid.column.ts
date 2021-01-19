import {Column} from "../column";

export class UuidColumn extends Column {

    constructor(name: string) {
        super(name, 'binary');
        this.setLength(16);
    }

    autoSetUuid() {
        this.default({expression: '(UUID_TO_BIN(UUID()))'});
        return this;
    }
}
