import {Column} from "../types/column";
import {IntColumn, IntSizeType} from "../types/types/int-column";
import {StringColumn} from "../types/types/string.column";
import {ConstrainedColumn} from "../types/constrained.column";
import {PrimaryColumn} from "../types/constraints/primary.column";
import {ForeignColumn} from "../types/constraints/foreign.column";
import {BooleanColumn} from "../types/types/boolean.column";
import {TextColumn, TextSizeType} from "../types/types/text.column";
import {FloatColumn} from "../types/types/float.column";
import {DoubleColumn} from "../types/types/double.column";
import {DecimalColumn} from "../types/types/decimal.column";
import {CharColumn} from "../types/types/char.column";
import {TimeColumn} from "../types/types/time.column";
import {DateColumn} from "../types/types/date.column";
import {DatetimeColumn} from "../types/types/datetime.column";
import {TimestampColumn} from "../types/types/timestamp.column";
import {UuidColumn} from "../types/types/uuid.column";
import {YearColumn} from "../types/types/year.column";
import {IndexColumn} from "../types/constraints/index.column";
import {UniqueColumn} from "../types/constraints/unique.column";
import {BinaryColumn} from "../types/types/binary.column";

export class Blueprint {

    private columns: Column[] = [];
    private constraints: ConstrainedColumn[] = [];
    private columnDrops: string[] = [];
    private foreignDrops: string[] = [];

    constructor(private tableName: string) {
    }

    year(name: string) {
        const yearColumn = new YearColumn(
            name
        );
        return this.addColumn(yearColumn);
    }

    uuid(name: string) {
        const uuidColumn = new UuidColumn(
            name
        );
        return this.addColumn(uuidColumn);
    }


    unsignedTinyInteger(name: string) {
        return this.unsignedInteger(name, 'tiny');
    }


    unsignedSmallInteger(name: string) {
        return this.unsignedInteger(name, 'small');
    }


    unsignedMediumInteger(name: string) {
        return this.unsignedInteger(name, 'medium');
    }

    unsignedInteger(name: string, size: IntSizeType = 'normal') {
        return this.integer(name, size).unsigned();
    }


    unsignedBigInteger(name: string) {
        return this.unsignedInteger(name, 'big');
    }

    unsignedDecimal(name: string, length: number = 8, decimalLength: number = 2) {
        return this.decimal(name, length, decimalLength).unsigned();
    }

    tinyInteger (name: string) {
        return this.integer(name, 'tiny');
    }


    tinyIncrements(name: string) {
        return this.increments(name, 'tiny');
    }

    timestampsTz() {
        this.timestamp('created_at').nullable().useCurrent();
        this.timestamp('updated_at').nullable().useCurrent().onUpdate();
    }

    timestamps() {
        this.timestamp('created_at').nullable().useCurrent();
        this.timestamp('updated_at').nullable().useCurrent().onUpdate();
    }

    timestampTz(name: string) {
        const timestampColumn = new TimestampColumn(
            name
        );
        return this.addColumn(timestampColumn);
    }

    timestamp(name: string) {
        const timestampColumn = new TimestampColumn(
            name
        );
        return this.addColumn(timestampColumn);
    }

    timeTz(name: string) {
        const timeColumn = new TimeColumn(
            name
        );
        return this.addColumn(timeColumn);
    }

    time(name: string) {
        const timeColumn = new TimeColumn(
            name
        );
        return this.addColumn(timeColumn);
    }

    text(name: string, size: TextSizeType = 'normal') {
        const textColumn = new TextColumn(
            name,
            size
        );
        return this.addColumn(textColumn);
    }


    smallInteger(name: string) {
        return this.integer(name, 'small');
    }


    smallIncrements(name: string) {
        return this.increments(name, 'small');
    }

    mediumText(name: string) {
        return this.text(name, 'medium');
    }

    mediumInteger(name: string) {
        return this.integer(name, 'medium');
    }


    mediumIncrements(name: string) {
        return this.increments(name, 'medium');
    }

    longText(name: string) {
        return this.text(name, 'long');
    }

    integer(name: string, size: IntSizeType = 'normal') {
        const integerColumn = new IntColumn(
            name,
            size
        )
        return this.addColumn(integerColumn);
    }

    float(name: string, length: number = 8, decimalLength: number = 2) {
        const floatColumn = new FloatColumn(
            name,
            length,
            decimalLength
        )
        return this.addColumn(floatColumn);
    }

    double(name: string, length: number = 8, decimalLength: number = 2) {
        const doubleColumn = new DoubleColumn(
            name,
            length,
            decimalLength
        )
        return this.addColumn(doubleColumn);
    }

    decimal(name: string, length: number = 8, decimalLength: number = 2) {
        const decimalColumn = new DecimalColumn(
            name,
            length,
            decimalLength
        )
        return this.addColumn(decimalColumn);
    }

    dateTimeTz(name: string) {
        const datetimeColumn = new DatetimeColumn(
            name
        );
        return this.addColumn(datetimeColumn);
    }

    dateTime(name: string) {
        const datetimeColumn = new DatetimeColumn(
            name
        );
        return this.addColumn(datetimeColumn);
    }

    date(name: string) {
        const dateColumn = new DateColumn(
            name
        );
        return this.addColumn(dateColumn);
    }

    char(name: string) {
        const charColumn = new CharColumn(
            name
        )
        return this.addColumn(charColumn);
    }

    boolean(name: string) {
        const booleanColumn = new BooleanColumn(
            name
        )
        return this.addColumn(booleanColumn);
    }


    bigInteger(name: string) {
        return this.integer(name, 'big');
    }


    bigIncrements(name: string) {
        return this.increments(name, 'big');
    }

    foreign(name: string, customName?: string) {
        const foreignColumn = new ForeignColumn(name, customName);
        return this.addConstrainedColumn(foreignColumn);
    }

    id() {
        return this.increments('id');
    }

    string(name: string, length = 181): StringColumn {
        const stringColumn = new StringColumn(
            name,
            length
        );
        return this.addColumn(stringColumn);
    }

    increments(name: string, size: IntSizeType = 'normal'): IntColumn {
        const incrementsColumn = new IntColumn(
            name,
            size
        ).unsigned()
            .autoincrement()
        this.addConstrainedColumn(new PrimaryColumn([name]))
        return this.addColumn(incrementsColumn);
    }

    binary(name: string, length: number) {
        const binaryColumn = new BinaryColumn(
            name,
            length
        );
        return this.addColumn(binaryColumn);
    }

    column(name: string,  type: string) {
        this.columns.push(
            new Column(name, type)
        )
    }

    dropColumn(name: string | string[]) {
        if (Array.isArray(name)) {
            this.columnDrops.push(...name);
        } else {
            this.columnDrops.push(name);
        }
    }

    dropForeign(name: string, customName: string = null) {
        if (customName) {
            this.foreignDrops.push(customName);
            return;
        }
        this.foreignDrops.push(`${this.tableName}_${name}_fk`);
    }

    index(name: string | string[]) {
        const indexColumn = new IndexColumn(name);
        return this.addConstrainedColumn(indexColumn);
    }

    unique(name: string | string[]) {
        const uniqueColumn = new UniqueColumn(name);
        return this.addConstrainedColumn(uniqueColumn);
    }

    primary(names: string[] | string, customName?: string) {
        if (typeof names === 'string') {
            names = [names];
        }
        const primaryColumn = new PrimaryColumn(names, customName);
        return this.addConstrainedColumn(primaryColumn);
    }

    addColumn<T extends Column>(column: T): T {
        this.columns.push(column);
        return <T>this.columns[this.columns.length - 1];
    }

    addConstrainedColumn<T extends ConstrainedColumn>(column: T): T {
        this.constraints.push(column);
        return <T>this.constraints[this.constraints.length - 1];
    }

    getConstraints() {
        return this.constraints;
    }

    getColumns() {
        return this.columns;
    }

    getColumnDrops() {
        return this.columnDrops;
    }

    getForeignDrops() {
        return this.foreignDrops;
    }
}
