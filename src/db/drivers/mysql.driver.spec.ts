import {MysqlDriver} from "./mysql.driver";


describe('Mysql driver', () => {
    let driver: MysqlDriver;


    beforeEach(() => {
        driver = new MysqlDriver();
    });

    it('should be able to create the driver', () => {
        expect(driver).toBeDefined();
    });

    it('Should enQuote the string with the correct quotes', () => {
        const result = driver.enQuote('test');
        expect(result).toBe('`test`');
    });

    it('Should return the correct type', () => {
        expect(driver.type).toBe('mysql');
    });
});
