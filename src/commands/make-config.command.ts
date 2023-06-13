import {Command} from "./command";
import path from "path";
import * as fs from "fs/promises";
import * as fss from "fs";


export class MakeConfigCommand extends Command {

    async run(): Promise<any> {
        const hasConfig = fss.existsSync(path.join(process.cwd(), 'migrationjs.conf.json'));
        if (!hasConfig) {
            const newConfig = {
                database: {
                    type: 'mysql',
                    host: 'localhost',
                    user: 'root',
                    password: '',
                    database: ''
                },
                folderName: 'migrations'
            };
            const json = JSON.stringify(newConfig, null, 2);
            await fs.writeFile(process.cwd() + '/migrationjs.conf.json', json, {});
        } else {
            throw Error('There is already an migrationjs.conf.json file');
        }
        return Promise.resolve();
    }

}
