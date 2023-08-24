import {Command} from "./command";
import path from "path";
import * as fs from "fs/promises";
import * as fss from "fs";
import {getConfig} from "../utils/get-config";


export class MakeConfigCommand extends Command {

    async run(): Promise<any> {
        const hasConfig = fss.existsSync(path.join(process.cwd(), 'migrationjs.conf.json'));
        if (!hasConfig) {
            const json = JSON.stringify(getConfig(true), null, 2);
            await fs.writeFile(process.cwd() + '/migrationjs.conf.json', json, {});
        } else {
            throw Error('There is already an migrationjs.conf.json file');
        }
        return Promise.resolve();
    }
}
