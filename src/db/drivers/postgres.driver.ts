import {Driver} from "../driver";
import {DatabaseConfig} from "../../interfaces/database.config";
import {Client, QueryResultRow} from 'pg'
import {DatabaseDriver} from "../../types/database.driver";

export class PostgresDriver implements Driver {
  private client: Client;

  async init(database: DatabaseConfig): Promise<void> {
    this.client = new Client({
      host     : database.host,
      user     : database.user,
      password : database.password,
      database : database.database,
      port: database.port ?? 5432
    });
    await this.client.connect()
  }

  async checkMigrationTable(): Promise<void> {
    const result = await this.query(`select * from pg_catalog.pg_tables where schemaname != 'pg_catalog' and schemaname != 'information_schema' and tablename = 'migrations'`);
    if (result.length === 0) {
      await this.query(`
        create table migrations (
           id int generated always as identity PRIMARY KEY,
           migration varchar(191) NOT NULL,
           batch int NOT NULL
        )`)
    }
  }

  getExistingMigrations(): Promise<string[]> {
    return this.query(`select * from migrations order by id DESC`).then(rows => rows.map(row => row.migration as string));
  }

  query<R extends QueryResultRow = any>(query: string, values?: any[]): Promise<R[]> {
    return this.client.query(query, values ?? []).then((result) => result.rows);
  }

  enQuote(str: string): string {
    return '"' + str + '"';
  }

  static enQuote(str: string): string {
    return '"' + str + '"';
  }

  get type(): DatabaseDriver {
    return 'postgres';
  }

}
