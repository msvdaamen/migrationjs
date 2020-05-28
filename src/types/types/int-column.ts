import {Column} from "../column";


export class IntColumn extends Column {

    constructor(name: string, size: intSize = 'normal') {
        let type = 'int'

        switch (size) {
            case 'tiny': type = 'tinyint'; break;
            case 'small': type = 'smallint'; break;
            case 'medium': type = 'mediumint'; break;
            case 'big': type = 'bigint'; break;
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
}
type intSize = 'normal' | 'tiny' | 'small' | 'medium' | 'big'
