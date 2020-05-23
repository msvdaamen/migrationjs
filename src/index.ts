import {Schema} from "./main/schema";
import {Migration} from "./main/migration";
const fs = require('fs');
const path = require('path');

async function run() {


    fs.readdir('migrations/', async (err, filenames) => {
        if (err) {
            throw Error(err);
        }
        for(let i = 0; i < filenames.length; i++) {
            const filename = filenames[i];
            const fleType = path.extname('migrations/' + filename);
            if (fleType === '.js') {
                import(`../migrations/${filename}`).then(file => {
                    const t: Migration = new file.default();
                    t.up(new Schema());
                }).catch(err => console.log(err));
            }
        }
    });
}
run();
