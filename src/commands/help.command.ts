import {Command} from "./command";


export class HelpCommand extends Command {

    async run(): Promise<any> {
        const keys = [];
        Command.registry.forEach((value, key: string) => {
            keys.push(key);
        })
        console.log(keys.join('\n'));
        return Promise.resolve();
    }
}
