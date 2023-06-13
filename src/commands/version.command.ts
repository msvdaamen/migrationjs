import {Command} from "./command";
import chalk from "chalk";

export class VersionCommand extends Command {

    async run(arg: string): Promise<any> {
        console.log(chalk.green("Version: 1.0.0"));
    }

}
