import {Column} from "../column";


export class TextColumn extends Column {


    constructor(name: string, size: TextSizeType = 'normal') {
        let type = 'text';
        switch (size) {
            case "tiny":
                type = 'tinytext';
                break;
            case "medium":
                type = 'mediumtext';
                break;
            case "long":
                type = 'longtext';
                break;
        }
        super(name, type);
    }
}
export type TextSizeType = 'tiny' | 'normal' | 'medium' | 'long';
