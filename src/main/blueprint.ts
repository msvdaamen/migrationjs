import {Column} from "../types/column";

export class Blueprint {

    private columns: Column[] = [];

    column(name: string,  type: string) {
        this.columns.push(
            new Column(name, type)
        )
    }
}
