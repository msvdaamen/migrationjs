import {Driver} from "../driver";
import * as mysql from "mysql2/promise";
import {Connection, SslOptions} from "mysql2/promise";
import {DatabaseConfig} from "../../interfaces/database.config";
import {RowDataPacket} from "mysql2";
import {DatabaseDriver} from "../../types/database.driver";
import {ConnectionOptions} from "mysql2/index";

export class MysqlDriver implements Driver {
  private connection: Connection = null;

  async init(database: DatabaseConfig) {
    const config: ConnectionOptions = {
      host     : database.host,
      user     : database.user,
      password : database.password,
      database : database.database,
      port: database.port ?? 3306
    };
    if (database.ssl?.rejectUnauthorized) {
      config.ssl = {};
        (config.ssl as SslOptions).rejectUnauthorized = true
    }
    this.connection = await mysql.createConnection(config);
    await this.connection.connect();
  }

  query<T = RowDataPacket[]>(query: string, values: any[] = []): Promise<T> {
    return this.connection.query(query, values).then((result) => result[0] as T);
  }

  async checkMigrationTable(): Promise<void> {
    const result = await this.query(`show tables like 'migrations'`);
    if (result.length === 0) {
      await this.query(`
            create table migrations (
               id int(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
               migration varchar(191) NOT NULL,
               batch int(11) NOT NULL
            )`)
    }
  }

  getExistingMigrations(): Promise<string[]> {
    return this.query(`select * from migrations order by id DESC`).then(rows => rows.map(row => row.migration as string));
  }

  enQuote(str: string): string {
    return '`' + str + '`';
  }

  get type(): DatabaseDriver {
    return 'mysql';
  }
}
