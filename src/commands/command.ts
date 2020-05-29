export abstract class Command {

    protected static registry = new Map<string, Command>();

    static register(name: string, command: Command) {
        this.registry.set(name, command);
    }

    static get(name: string) {
        if (!this.registry.has(name)) {
            return this.registry.get('help');

        }
        return this.registry.get(name);
    }

    abstract async run(arg: string);
}
