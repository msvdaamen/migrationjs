import {Command} from "./command";
import {writeFile} from "../utils/write-file";


const migrationContent = (fileName: string) =>
`import {Migration, Blueprint, Schema} from 'migrationjs';


export default class ${fileName} extends Migration {

    async up() {
        await Schema.crate('name', (table) => {
            
        });
    }

    async down() {
        await Schema.dropIfExists('name');
    }
}
`

export class MakeMigrationCommand extends Command {
    async run(name: string): Promise<any> {
        const config = require(process.cwd() + '/migrationjs.conf.json');
        const rootPath = process.cwd();
        const date = new Date();
        const dateString = `${date.getFullYear()}_${this.appendZero(date.getMonth())}_${this.appendZero(date.getDate())}_${this.appendZero(date.getHours())}${this.appendZero(date.getMinutes())}${this.appendZero(date.getSeconds())}`;
        const migrationFileName = `${rootPath}/${config.folderName}/${dateString}_${name}.ts`;
        await writeFile(migrationFileName, migrationContent(name), {});
        return Promise.resolve();
    }

    appendZero(value: number) {
        if (value < 10) {
            // @ts-ignore
            value = '0' + value;
        }
        return value;
    }

}
