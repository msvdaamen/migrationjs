import {Config} from "../interfaces/config.interface";
import fs from "fs/promises";
import path from "path";

const defaultConfig: Config = {
    database: {
        driver: 'mysql',
        host: 'localhost',
        user: 'root',
        password: '',
        database: '',
        port: 3306
    },
    folderName: 'migrations'
};

export async function getConfig(defaultConf: boolean = false): Promise<Config> {
    if (defaultConf) {
        return defaultConfig;
    }
    const configString = await fs.readFile(path.join(process.cwd(), 'migrationjs.conf.json'), {encoding: 'utf-8'});
    if (!configString) {
        throw Error('No migrationjs.conf.json in project root');
    }
    const config: Config = JSON.parse(configString);
    return Object.assign(defaultConfig, config);
}
