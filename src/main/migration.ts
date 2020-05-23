import {Schema} from "./schema";


export abstract class Migration {

    abstract up(schema: Schema);

    abstract down(schema: Schema);

}
