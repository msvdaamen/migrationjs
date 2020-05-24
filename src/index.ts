import {Migration} from "./main/migration";
import {checkMigrationTable} from "./db/connection";
const fs = require('fs');
const path = require('path');

const migrationsPath = 'migrations/';

export async function migrate(globalPath: string) {

    checkMigrationTable();

    fs.readdir(migrationsPath, (err: any, filenames: string[]) => {
        if (err) {
            throw Error(err);
        }

        for(let i = 0; i < filenames.length; i++) {
            const filename = filenames[i];
            const fleType = path.extname(path.join(globalPath, migrationsPath, filename));
            if (fleType === '.js') {
                import(path.join(globalPath, migrationsPath, filename)).then(file => {
                    if (file.default.prototype.up && file.default.prototype.down) {
                        const t: Migration = new file.default();
                        t.up();
                        // t.migrate();
                    }
                }).catch(err => console.log(err));
            }
        }
    });

    return true;
}
