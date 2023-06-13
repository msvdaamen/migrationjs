import {Command} from "./command";
import chalk from "chalk";

export class VersionCommand extends Command {


    async run(arg: string): Promise<any> {
        const packageJson = await import('../../package.json'); // require('../../package.json');
        console.log(chalk.green(packageJson.version));
    }

}
