export declare function migrate(globalPath: string, config: Config): Promise<boolean>;
interface Config {
    database: DatabaseConfig;
    folderName: string;
}
export interface DatabaseConfig {
    host: string;
    user: string;
    password: string;
    database: string;
}
export {};
