import {Command} from "./command";
import {migrate} from "../index";

export class MigrateCommand extends Command {

    async run(): Promise<any> {
        const config = require(process.cwd() + '/migrationjs.conf.json');
        if (!config) {
            throw Error('No migrationjs.conf.json in project root');
        }
        return migrate(process.cwd(), config);
    }

}
