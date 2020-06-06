import {Command} from "./command";
import {query, setupDbConnection} from "../db/connection";
import {Config} from "../interfaces/config,interface";
import SQL from "sql-template-strings";
import {compileTsFiles} from "../utils/compilets";
import {Migration} from "../main/migration";
import * as fs from "fs";
import path from "path";


export class RollbackCommand extends Command {

    async run(arg: string): Promise<any> {
        const config = require(process.cwd() + '/migrationjs.conf.json');
        if (!config) {
            throw Error('No migrationjs.conf.json in project root');
        }
        return await this.rollback(process.cwd(), config);
    }


    async rollback(globalPath: string, config: Config) {
        setupDbConnection(config.database);

        const result = await query(`select batch from migrations order by batch desc limit 1`);
        if(result.length === 0) {
            throw Error('there or no migration');
        }
        const lastMigrationBatchNumber = result[0].batch;

        const migrations = await query(SQL`select * from migrations where batch = ${lastMigrationBatchNumber} order by id desc`);


        try {
            const migrationsPath = config.folderName;
            for(let i = 0; i < migrations.length; i++) {
                const migration = migrations[i];
                const fileName = `${migration.migration}.ts`;
                if (fs.existsSync(path.join(globalPath, migrationsPath, fileName))) {
                    const file =  await compileTsFiles(globalPath, migrationsPath, fileName);
                    if (file.default.prototype.up && file.default.prototype.down) {
                        const t: Migration = new file.default();
                        await t.down();
                        await query(SQL`delete from migrations where id = ${migration.id}`);
                    }
                } else {
                    await query(SQL`delete from migrations where id = ${migration.id}`);
                }
            }
            return true;
        } catch (e) {
            console.log('error: ' + e);
            return true;
        }

    }

}
