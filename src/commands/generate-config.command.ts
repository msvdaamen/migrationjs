import {Command} from "./command";
import * as fs from "fs";


export class GenerateConfigCommand extends Command {

    async run(): Promise<any> {
        const config = require(process.cwd() + '/migrationjs.conf.json');
        if (!config) {
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
            fs.writeFile(process.cwd() + '/migrationjs.conf.json', json, 'utf8', () => {});
        } else {
            throw Error('There is already an migrationjs.conf.json file');
        }
        return Promise.resolve();
    }

}
