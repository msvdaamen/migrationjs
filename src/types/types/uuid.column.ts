import {Column} from "../column";

export class UuidColumn extends Column {

    constructor(name: string) {
        super(name, 'uuid');
    }
}
