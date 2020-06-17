import {Command} from "./command";
import {writeFile} from "../utils/write-file";


const migrationContent = (fileName: string) =>
`import {Migration} from 'migrationjs';
import {Blueprint} from 'migrationjs';
import {Schema} from 'migrationjs';


export default class ${fileName} extends Migration {

    async up() {
        throw new Error("Method not implemented.");
    }

    async down() {
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
