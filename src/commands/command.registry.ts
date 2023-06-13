import {MigrateCommand} from "./migrate.command";
import {Command} from "./command";
import {HelpCommand} from "./help.command";
import {MakeConfigCommand} from "./make-config.command";
import {MakeMigrationCommand} from "./make-migration.command";
import {RollbackCommand} from "./rollback.command";
import {VersionCommand} from "./version.command";

export function registerCommands() {
    Command.register('help', new HelpCommand());
    Command.register('migrate', new MigrateCommand());
    Command.register('make:config',  new MakeConfigCommand());
    Command.register('make:migration', new MakeMigrationCommand());
    Command.register('rollback', new RollbackCommand());
    Command.register('version', new VersionCommand());
}
