import {MigrateCommand} from "./migrate.command";
import {Command} from "./command";
import {HelpCommand} from "./help.command";
import {GenerateConfigCommand} from "./generate-config.command";
import {MakeMigrationCommand} from "./make-migration.command";

export function registerCommands() {
    Command.register('help', new HelpCommand());
    Command.register('migrate', new MigrateCommand());
    Command.register('generate:config',  new GenerateConfigCommand());
    Command.register('make:migration', new MakeMigrationCommand());
}
