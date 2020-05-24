import {Column} from "../types/column";
import {IntColumn} from "../types/int-column";
import {StringColumn} from "../types/string.column";

export class Blueprint {

    private columns: Column[] = [];

    // TODO
    year(name: string) {

    }

    // TODO
    uuid(name: string) {

    }

    // TODO
    unsignedTinyInteger(name: string) {

    }

    // TODO
    unsignedSmallInteger(name: string) {

    }

    // TODO
    unsignedMediumInteger(name: string) {

    }

    // TODO
    unsignedInteger(name: string) {

    }

    // TODO
    unsignedDecimal(name: string, length: number = 8, decimalLength: number = 2) {

    }

    // TODO
    unsignedBigInteger(name: string) {

    }

    // TODO
    tinyInteger (name: string) {

    }

    // TODO
    tinyIncrements(name: string) {

    }

    // TODO
    timestampsTz() {

    }

    // TODO
    timestamps() {

    }

    // TODO
    timestampTz(name: string) {

    }

    // TODO
    timestamp(name: string) {

    }

    // TODO
    timeTz(name: string) {

    }

    // TODO
    time(name: string) {

    }

    // TODO
    text(nam: string) {

    }

    // TODO
    smallInteger(name: string) {

    }

    // TODO
    smallIncrements(name: string) {

    }

    // TODO
    mediumText(name: string) {

    }

    // TODO
    mediumInteger(name: string) {

    }

    // TODO
    mediumIncrements(name: string) {

    }

    // TODO
    longText(name: string) {

    }

    // TODO
    integer(name: string) {

    }

    // TODO
    float(name: string, length: number = 8, decimalLength: number = 2) {

    }

    // TODO
    double(name: string, length: number = 8, decimalLength: number = 2) {

    }

    // TODO
    decimal(name: string, length: number = 8, decimalLength: number = 2) {

    }

    // TODO
    dateTimeTz(name: string) {

    }

    // TODO
    dateTime(name: string) {

    }

    // TODO
    date(name: string) {

    }

    // TODO
    char(name: string) {

    }

    // TODO
    boolean(name: string) {

    }

    // TODO
    bigInteger(name: string) {

    }

    // TODO
    bigIncrements(name: string) {

    }

    // TODO use unsignedBigInteger function
    foreignId(name: string) {

    }

    id() {
        return this.increments('id');
    }

    string(name: string, length = 181): StringColumn {
        this.columns.push(
            new StringColumn(
                name,
                length
            )
        );
        return this.columns[this.columns.length - 1];
    }

    increments(name: string): IntColumn {
        this.columns.push(
            new IntColumn(
                name
            )
        );
        return this.columns[this.columns.length - 1];
    }

    column(name: string,  type: string) {
        this.columns.push(
            new Column(name, type)
        )
    }

    getColumns() {
        return this.columns;
    }
}
