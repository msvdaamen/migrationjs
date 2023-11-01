import {Column} from "../column";
import {DatabaseDriver} from "../database.driver";
import {Schema} from "../../main/schema";

export abstract class UuidColumn extends Column {

    static create(name: string) {
        switch (Schema.driver.type) {
            case 'mysql':
                return new MysqlUuidColumn(name);
            case 'postgres':
                return new PostgresUuidColumn(name);
        }
    }

    protected constructor(name: string, type: string) {
        super(name, type);
    }

    abstract autoSetUuid(): UuidColumn;
}

export class MysqlUuidColumn extends UuidColumn {

    constructor(name: string) {
        super(name, 'binary');
        this.setLength(16);
    }

    autoSetUuid(): MysqlUuidColumn {
        this.default({expression: '(UUID_TO_BIN(UUID()))'});
        return this;
    }
}
export class PostgresUuidColumn extends UuidColumn {

    constructor(name: string) {
        super(name, 'uuid');
    }

    autoSetUuid(): PostgresUuidColumn {
        this.default({expression: 'uuid_generate_v4()'});
        return this;
    }
}
