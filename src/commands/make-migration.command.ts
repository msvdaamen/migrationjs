import {Command} from "./command";
import {writeFile} from "../utils/write-file";

enum MigrationType {
    CREATE = 'create',
    ALTER = 'table'
}

const dropExistString = (tableName: string) => {
    if (tableName) {
        return `await Schema.dropIfExists('${tableName}');`
    }
    return '';
}
const upString = (action: string, tableName: string) => {
    if (!tableName) {
        return '';
    }
    return `await Schema.${action ? action : 'create'}('${tableName}', (table) => {
            
        });`
}

const migrationContent = (fileName: string, action: string = null, tableName: string = null) =>
`import {Migration, Blueprint, Schema} from 'migrationjs';


export default class ${fileName} extends Migration {

    async up() {
        ${upString(action, tableName)}
    }

    async down() {
        ${action === 'create' ? dropExistString(tableName) : ''}
    }
}
`;

export class MakeMigrationCommand extends Command {
    async run(name: string): Promise<any> {
        const config = require(process.cwd() + '/migrationjs.conf.json');
        const rootPath = process.cwd();
        const date = new Date();
        const dateString = `${date.getFullYear()}_${this.appendZero(date.getMonth())}_${this.appendZero(date.getDate())}_${this.appendZero(date.getHours())}${this.appendZero(date.getMinutes())}${this.appendZero(date.getSeconds())}`;
        const migrationFileName = `${rootPath}/${config.folderName}/${dateString}_${name}.ts`;
        const tableName = this.extractTableName(name);
        await writeFile(migrationFileName, migrationContent(name, tableName?.type, tableName?.name), {});
        return Promise.resolve();
    }

    appendZero(value: number) {
        if (value < 10) {
            // @ts-ignore
            value = '0' + value;
        }
        return value;
    }

    extractTableName(fileName: string): {name: string, type: MigrationType} {
        if (!fileName) {
            return null;
        }
        let name = null;
        let type = null;
        if (fileName.toLocaleLowerCase().startsWith('create')) {
           type = MigrationType.CREATE
        } else if (fileName.toLocaleLowerCase().startsWith('alter')) {
            type = MigrationType.ALTER
        }
        const tableStringIndex = fileName.toLocaleLowerCase().indexOf('table');
        let actionIndexEnd = null;
        if (type) {
            actionIndexEnd = type.length;
        }
        if (tableStringIndex && actionIndexEnd) {
            name = fileName.substr(actionIndexEnd, tableStringIndex - actionIndexEnd);
            name = name.replace(/\.?([A-Z]+)/g, function (x,y){return "_" + y.toLowerCase()}).replace(/^_/, "");
        }
        if (name && type) {
            return  {
                name,
                type
            }
        }
        return null;
    }

}
