import {Migration} from "./main/migration";
import {checkMigrationTable, removeAllTables, setupDbConnection} from "./db/connection";
import {readdir} from './utils/readdir';

const path = require('path');

export async function migrate(globalPath: string, config: Config) {

    setupDbConnection(config.database);

    await removeAllTables();

    await checkMigrationTable();

    const migrationsPath = config.folderName;

    try {
        const filenames = await readdir(migrationsPath);

        for(let i = 0; i < filenames.length; i++) {
            const filename = filenames[i];
            const fleType = path.extname(path.join(globalPath, migrationsPath, filename));
            if (fleType === '.js') {
                const file = await import(path.join(globalPath, migrationsPath, filename));
                if (file.default.prototype.up && file.default.prototype.down) {
                    const t: Migration = new file.default();
                    await t.up();
                }
            }
        }
        return true;
    } catch (e) {
        console.log('error: ' + e);
        return true;
    }
}


interface Config {
    database: DatabaseConfig;
    folderName: string
}

export interface DatabaseConfig {
    host: string;
    user: string;
    password: string;
    database: string
}
