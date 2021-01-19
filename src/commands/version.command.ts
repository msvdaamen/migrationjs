import {Command} from "./command";

export class VersionCommand extends Command {


    async run(arg: string): Promise<any> {
        return Promise.resolve();
    }

}
