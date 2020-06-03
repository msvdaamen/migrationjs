import {Column} from "../column";

export class DatetimeColumn extends Column {

    constructor(name: string) {
        super(name, 'datetime');
    }
}
