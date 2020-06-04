import {Migration} from "./main/migration";
import {checkMigrationTable, getExistingMigrations, query, removeAllTables, setupDbConnection} from "./db/connection";
import {readdir} from './utils/readdir';
const ts = require("typescript")
const fs = require("fs");
const path = require('path');
const SQL = require('sql-template-strings');

export async function migrate(globalPath: string, config: Config) {

    setupDbConnection(config.database);

    await removeAllTables();

    await checkMigrationTable();

    const existingMigrations = await getExistingMigrations();
    const migrationSet = new Set<string>();
    existingMigrations.forEach(migration => {
        migrationSet.add(migration.migration);
    })

    const migrationsPath = config.folderName;

    try {
        const filenames = await readdir(migrationsPath);
        const newMigrationSet = new Set<string>();
        filenames.forEach(filename => {
            const subFilename = filename.substr(0, filename.lastIndexOf("."));
            const fileType = path.extname(path.join(globalPath, migrationsPath, filename));

            if (!migrationSet.has(subFilename)) {
                if (fileType === '.ts') {
                    newMigrationSet.add(filename);
                }
            }
        });

        const newMigrations = Array.from(newMigrationSet);

        const result = await query(`select max(batch) as max from migrations`);
        let batchNumber = 1;
        if (result[0].max) {
            batchNumber = (result[0].max + 1);
        }

        for(let i = 0; i < newMigrations.length; i++) {
            const migration = newMigrations[i];
            const subFilename = migration.substr(0, migration.lastIndexOf("."));
            // const file = await import(path.join(globalPath, migrationsPath, migration));
            const file =  await compileTsFiles(globalPath, migrationsPath, migration);
            if (file.default.prototype.up && file.default.prototype.down) {
                const t: Migration = new file.default();
                await t.up();
                await query(SQL`insert into migrations (migration, batch) values (${subFilename}, ${batchNumber})`);
                console.log(`migrated: ${subFilename}`);
            }
        }

        // for(let i = 0; i < newMigrations.length; i++) {
        //     const filename = filenames[i];
        //     const subFilename = filename.substr(0, filename.lastIndexOf("."));
        //     const fleType = path.extname(path.join(globalPath, migrationsPath, filename));
        //     if (fleType === '.js') {
        //         const file = await import(path.join(globalPath, migrationsPath, filename));
        //         if (file.default.prototype.up && file.default.prototype.down) {
        //             const t: Migration = new file.default();
        //             await t.up();
        //             await query(SQL`insert into migrations (migration, batch) values (${subFilename}, 1)`);
        //         }
        //     }
        // }
        return true;
    } catch (e) {
        console.log('error: ' + e);
        return true;
    }
}

async function compileTsFiles(globalPath, migrationsPath, file: string) {
        const tsFile = fs.readFileSync(path.join(globalPath, migrationsPath, file), 'utf8');
        const result = ts.transpileModule(tsFile, {module: ts.ModuleKind.CommonJS, allowJs: true});
        return requireFromString(result.outputText);
}

function requireFromString(src, filename = '') {
    // @ts-ignore
    var m = new module.constructor();
    m.paths = module.paths;
    m._compile(src, filename);
    return m.exports;
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
