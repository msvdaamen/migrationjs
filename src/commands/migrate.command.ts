import {Command} from "./command";
import {checkMigrationTable, getExistingMigrations, query, removeAllTables, setupDbConnection} from "../db/connection";
import {readdir} from "../utils/readdir";
import {Migration} from "../main/migration";
import {Config} from "../interfaces/config,interface";
import {compileTsFiles} from "../utils/compilets";
const path = require('path');
const SQL = require('sql-template-strings');

export class MigrateCommand extends Command {

    async run(): Promise<any> {
        const config = require(process.cwd() + '/migrationjs.conf.json');
        if (!config) {
            throw Error('No migrationjs.conf.json in project root');
        }
        return this.migrate(process.cwd(), config);
    }

    async migrate(globalPath: string, config: Config) {

        setupDbConnection(config.database);

        // await removeAllTables();

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

}
