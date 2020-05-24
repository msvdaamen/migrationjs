import {Schema} from "./main/schema";
import {Migration} from "./main/migration";
const fs = require('fs');
const path = require('path');

const migrationsPath = 'migrations/';

async function run() {
    fs.readdir(migrationsPath, async (err, filenames) => {
        if (err) {
            throw Error(err);
        }
        for(let i = 0; i < filenames.length; i++) {
            const filename = filenames[i];
            const fleType = path.extname(migrationsPath + filename);
            if (fleType === '.js') {
                import(`../${migrationsPath}${filename}`).then(file => {
                    if (file.default.prototype.up && file.default.prototype.down) {
                        const t: Migration = new file.default();
                        t.up();
                    }
                }).catch(err => console.log(err));
            }
        }
    });
}
run();
