import {Command} from "./command";
import * as fs from "fs";
import path from "path";
import {writeFile} from "../utils/write-file";


export class GenerateConfigCommand extends Command {

    async run(): Promise<any> {
        const hasConfig = fs.existsSync(path.join(process.cwd(), 'migrationjs.conf.json'));
        if (!hasConfig) {
            const newConfig = {
                database: {
                    host: 'localhost',
                    user: 'root',
                    password: '',
                    database: ''
                },
                folderName: 'migrations'
            };
            const json = JSON.stringify(newConfig);
            await writeFile(process.cwd() + '/migrationjs.conf.json', json, {});
        } else {
            throw Error('There is already an migrationjs.conf.json file');
        }
        return Promise.resolve();
    }

}
