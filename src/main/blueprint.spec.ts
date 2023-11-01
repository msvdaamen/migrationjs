import {describe} from "node:test";
import {Blueprint} from "./blueprint";
import {MysqlDriver} from "../db/drivers/mysql.driver";

describe('Blueprint', () => {
    let blueprint: Blueprint;

    beforeEach(() => {
        blueprint = new Blueprint('users', new MysqlDriver());
    });

    it('should be able to create a blueprint', () => {
        expect(blueprint).toBeDefined();
    });
});
