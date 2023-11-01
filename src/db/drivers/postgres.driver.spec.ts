import {PostgresDriver} from "./postgres.driver";


describe('Postgres river', () => {
    let driver: PostgresDriver;


    beforeEach(() => {
        driver = new PostgresDriver();
    });

    it('should be able to create the driver', () => {
        expect(driver).toBeDefined();
    });

    it('Should enQuote the string with the correct quotes', () => {
        const result = driver.enQuote('test');
        expect(result).toBe('"test"');
    });

    it('Should return the correct type', () => {
        expect(driver.type).toBe('postgres');
    });
});
