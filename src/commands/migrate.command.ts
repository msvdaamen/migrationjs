import {Command} from "./command";
import {setupDbConnection} from "../db/connection";
import {readdir} from "../utils/readdir";
import {Migration} from "../main/migration";
import {Config} from "../interfaces/config.interface";
import {compileTsFiles} from "../utils/compilets";
import * as path from 'path';
import chalk from 'chalk';
import fs from "fs/promises";
import {performance} from 'perf_hooks';
import {Schema} from "../main/schema";

export class MigrateCommand extends Command {

    async run(): Promise<any> {
        const configString = await fs.readFile(path.join(process.cwd(), 'migrationjs.conf.json'), {encoding: 'utf-8'});
        if (!configString) {
            throw Error('No migrationjs.conf.json in project root');
        }
        const config: Config = JSON.parse(configString);
        return this.migrate(process.cwd(), config);
    }

    async migrate(globalPath: string, config: Config) {

        const dbDriver = await setupDbConnection(config.database);
        await dbDriver.checkMigrationTable();

        const existingMigrations = await dbDriver.getExistingMigrations();
        const migrationSet = new Set<string>();
        existingMigrations.forEach(migration => {
            migrationSet.add(migration);
        });

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

            const result = await dbDriver.query(`select max(batch) as max from migrations`);
            let batchNumber = 1;
            if (result[0].max) {
                batchNumber = (result[0].max + 1);
            }

            for(let i = 0; i < newMigrations.length; i++) {
                const timeFrom = performance.now();
                const migration = newMigrations[i];
                const subFilename = migration.substr(0, migration.lastIndexOf("."));
                const file =  await compileTsFiles(globalPath, migrationsPath, migration);
                if (file.default.prototype.up && file.default.prototype.down) {
                    const t: Migration = new file.default();
                    Schema.setDriver(dbDriver);
                    console.log(chalk.yellow(`Migrating: `) + subFilename);
                    await t.up();
                    await dbDriver.query(`insert into migrations (migration, batch) values ('${subFilename}', ${batchNumber})`);
                    const timeUntil = performance.now();
                    const timeTaken = (timeUntil - timeFrom).toFixed(2);
                    console.log(chalk.green(`Migrated: `) + `${subFilename} (${timeTaken}ms)`);
                }
            }
            return true;
        } catch (e) {
            console.log(chalk.red('error: ' + e));
            return true;
        }
    }

}
