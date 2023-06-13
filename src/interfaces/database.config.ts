import {DatabaseDriver} from "../types/database.driver";

export interface DatabaseConfig {
    driver: DatabaseDriver;
    host: string;
    user: string;
    password: string;
    port: number;
    database: string
}
