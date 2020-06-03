import {Column} from "../column";


export class DateColumn extends Column {
    
    constructor(name: string) {
        super(name, 'date');
    }
}
