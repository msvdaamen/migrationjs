import {Column} from "../column";


export class IntColumn extends Column {

    constructor(name: string, size: IntSizeType = 'normal') {
        let type = 'INT'

        switch (size) {
            case 'tiny': type = 'TINYINT'; break;
            case 'small': type = 'SMALLINT'; break;
            case 'medium': type = 'MEDIUMINT'; break;
            case 'big': type = 'BIGINT'; break;
        }
        super(name, type);
    }

    autoincrement() {
        this.addAttribute('AUTO_INCREMENT');
        return this;
    }

    unsigned() {
        this.addAttribute('UNSIGNED');
        return this;
    }

    default(defaultValue: number): this {
        return super.default(defaultValue);
    }
}
export type IntSizeType = 'normal' | 'tiny' | 'small' | 'medium' | 'big'
