import {PathLike, WriteFileOptions} from "fs";
const fs = require('fs');

export async function writeFile(name: PathLike | number, content: string | NodeJS.ArrayBufferView, options: WriteFileOptions) {
    return new Promise((resolve, reject) => {
        fs.writeFile(name, content, options, (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
            return;
        })
    });
}
