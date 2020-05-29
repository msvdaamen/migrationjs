import {Command} from "./command";
import {writeFile} from "../utils/write-file";


const migrationContent = (fileName: string) =>
`import {Migration} from 'migrationjs/src/main/Migration';
import {Blueprint} from 'migrationjs/src/main/Blueprint';
import {Schema} from 'migrationjs/src/main/Schema';


export default class ${fileName} extends Migration {

    async up() {
        throw new Error("Method not implemented.");
    }

    down(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
`

export class MakeMigrationCommand extends Command {
    async run(name: string): Promise<any> {
        const config = require(process.cwd() + '/migrationjs.conf.json');
        const rootPath = process.cwd();
        const date = new Date();
        const dateString = `${date.getFullYear()}_${date.getMonth()}_${date.getDate()}_${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
        const migrationFileName = `${rootPath}/${config.folderName}/${dateString}_${name}.ts`;
        await writeFile(migrationFileName, migrationContent(name), {});
        return Promise.resolve();
    }

}
