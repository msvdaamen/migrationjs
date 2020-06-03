import {Column} from "../types/column";
import {IntColumn} from "../types/types/int-column";
import {StringColumn} from "../types/types/string.column";
import {ConstrainedColumn} from "../types/constrained.column";
import {PrimaryColumn} from "../types/constraints/primary.column";
import {ForeignColumn} from "../types/constraints/foreign.column";
import {BooleanColumn} from "../types/types/boolean.column";

export class Blueprint {

    private columns: Column[] = [];
    private constraints: ConstrainedColumn[] = [];

    // TODO
    year(name: string) {

    }

    // TODO
    uuid(name: string) {

    }


    unsignedTinyInteger(name: string) {
        const unsignedIntegerColumn = new IntColumn(
            name,
            'tiny'
        ).unsigned();
        return <IntColumn>this.addColumn(unsignedIntegerColumn);
    }


    unsignedSmallInteger(name: string) {
        const unsignedIntegerColumn = new IntColumn(
            name,
            'small'
        ).unsigned();
        return <IntColumn>this.addColumn(unsignedIntegerColumn);
    }


    unsignedMediumInteger(name: string) {
        const unsignedIntegerColumn = new IntColumn(
            name,
            'medium'
        ).unsigned();
        return <IntColumn>this.addColumn(unsignedIntegerColumn);
    }

    unsignedInteger(name: string) {
        const unsignedIntegerColumn = new IntColumn(
            name
        ).unsigned();
        return <IntColumn>this.addColumn(unsignedIntegerColumn);
    }


    unsignedBigInteger(name: string) {
        const unsignedIntegerColumn = new IntColumn(
            name,
            'big'
        ).unsigned();
        return <IntColumn>this.addColumn(unsignedIntegerColumn);
    }

    // TODO
    unsignedDecimal(name: string, length: number = 8, decimalLength: number = 2) {

    }

    tinyInteger (name: string) {
        const incrementsColumn = new IntColumn(
            name,
            'tiny'
        ).unsigned()
            .autoincrement()
        this.addConstrainedColumn(new PrimaryColumn([name]))
        return <IntColumn>this.addColumn(incrementsColumn);
    }


    tinyIncrements(name: string) {
        const incrementsColumn = new IntColumn(
            name,
            'tiny'
        ).unsigned()
            .autoincrement()
        this.addConstrainedColumn(new PrimaryColumn([name]))
        return <IntColumn>this.addColumn(incrementsColumn);
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


    smallInteger(name: string) {
        const incrementsColumn = new IntColumn(
            name,
            'small'
        ).unsigned()
            .autoincrement()
        this.addConstrainedColumn(new PrimaryColumn([name]))
        return <IntColumn>this.addColumn(incrementsColumn);
    }


    smallIncrements(name: string) {
        const incrementsColumn = new IntColumn(
            name,
            'small'
        ).unsigned()
            .autoincrement()
        this.addConstrainedColumn(new PrimaryColumn([name]))
        return <IntColumn>this.addColumn(incrementsColumn);
    }

    // TODO
    mediumText(name: string) {

    }


    mediumInteger(name: string) {
        const incrementsColumn = new IntColumn(
            name,
            'medium'
        ).unsigned()
            .autoincrement()
        this.addConstrainedColumn(new PrimaryColumn([name]))
        return <IntColumn>this.addColumn(incrementsColumn);
    }


    mediumIncrements(name: string) {
        const incrementsColumn = new IntColumn(
            name,
            'medium'
        ).unsigned()
            .autoincrement()
        this.addConstrainedColumn(new PrimaryColumn([name]))
        return <IntColumn>this.addColumn(incrementsColumn);
    }

    // TODO
    longText(name: string) {

    }

    integer(name: string) {
        const integerColumn = new IntColumn(
            name
        )
        return this.addColumn(integerColumn);
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
        const booleanColumn = new BooleanColumn(
            name
        )
        return <BooleanColumn>this.addColumn(booleanColumn);
    }


    bigInteger(name: string) {
        const bigIntColumn = new IntColumn(
            name,
            'big'
        );
        return <IntColumn>this.addColumn(bigIntColumn);
    }


    bigIncrements(name: string) {
        const incrementsColumn = new IntColumn(
            name,
            'big'
        ).unsigned()
            .autoincrement()
        this.addConstrainedColumn(new PrimaryColumn([name]))
        return <IntColumn>this.addColumn(incrementsColumn);
    }

    // TODO use unsignedBigInteger function
    foreignId(name: string) {

    }

    foreign(name: string) {
        const foreignColumn = new ForeignColumn(name);
        return <ForeignColumn>this.addConstrainedColumn(foreignColumn);
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

    increments(name: string): IntColumn {
        const incrementsColumn = new IntColumn(
            name
        ).unsigned()
            .autoincrement()
        this.addConstrainedColumn(new PrimaryColumn([name]))
        return <IntColumn>this.addColumn(incrementsColumn);
    }

    column(name: string,  type: string) {
        this.columns.push(
            new Column(name, type)
        )
    }

    addColumn(column: Column): Column {
        this.columns.push(column);
        return this.columns[this.columns.length - 1];
    }

    addConstrainedColumn(column: ConstrainedColumn): ConstrainedColumn{
        this.constraints.push(column);
        return this.constraints[this.constraints.length - 1];
    }

    getConstraints() {
        return this.constraints;
    }

    getColumns() {
        return this.columns;
    }
}
