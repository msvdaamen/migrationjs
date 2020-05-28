const fs = require('fs');

export function readdir(path: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        fs.readdir(path, async (err: any, filenames: string[]) => {
            if (err) {
                reject(err);
            }
            resolve(filenames);
        });
    })
}
