import {Command} from "./command";
import {setupDbConnection} from "../db/connection";
import {Config} from "../interfaces/config.interface";
import {compileTsFiles} from "../utils/compilets";
import {Migration} from "../main/migration";
import * as fs from "fs/promises";
import * as fss from "fs";
import path from "path";
import chalk from 'chalk';
import {performance} from 'perf_hooks';
import {Schema} from "../main/schema";

export class RollbackCommand extends Command {

    async run(arg: string): Promise<any> {
        const configString = await fs.readFile(path.join(process.cwd(), 'migrationjs.conf.json'), {encoding: 'utf-8'});
        if (!configString) {
            throw Error('No migrationjs.conf.json in project root');
        }
        const config: Config = JSON.parse(configString);
        return await this.rollback(process.cwd(), config);
    }


    async rollback(globalPath: string, config: Config) {
        const dbDriver = await setupDbConnection(config.database);

        const result = await dbDriver.query(`select batch from migrations order by batch desc limit 1`);
        if(result.length === 0) {
            throw Error('there or no migration');
        }
        const lastMigrationBatchNumber = result[0].batch;

        const migrations = await dbDriver.query(`select * from migrations where batch = ${lastMigrationBatchNumber} order by id desc`);


        try {
            const migrationsPath = config.folderName;
            for(let i = 0; i < migrations.length; i++) {
                const timeFrom = performance.now();
                const migration = migrations[i];
                const fileName = `${migration.migration}.ts`;
                console.log(chalk.yellow(`Rolling back: `) + fileName);
                if (fss.existsSync(path.join(globalPath, migrationsPath, fileName))) {
                    const file =  await compileTsFiles(globalPath, migrationsPath, fileName);
                    if (file.default.prototype.up && file.default.prototype.down) {
                        const t: Migration = new file.default();
                        Schema.setDriver(dbDriver);
                        await t.down();
                        await dbDriver.query(`delete from migrations where id = ${migration.id}`);
                    }
                } else {
                    await dbDriver.query(`delete from migrations where id = ${migration.id}`);
                }
                const timeUntil = performance.now();
                const timeTaken = (timeUntil - timeFrom).toFixed(2);
                console.log(chalk.green(`Rolled back: `) + `${fileName} (${timeTaken}ms)`);
            }
            return true;
        } catch (e) {
            console.log(chalk.red('error: ' + e));
            return true;
        }

    }

}
