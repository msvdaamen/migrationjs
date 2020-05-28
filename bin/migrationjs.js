#!/usr/bin/env node
const args = require('process.args')();
const {migrate} = require('../src/index');
var fs = require('fs');

if (args.hasOwnProperty('migrate')) {
    const config = require(process.cwd() + '/migrationjs.conf.json');
    if (!config) {
        throw Error('No migrationjs.conf.json in project root');
    }
    migrate(process.cwd(), config).then(() => {
        process.exit();
    });
} else if (args.hasOwnProperty('generate:config')) {
    const config = require(process.cwd() + '/migrationjs.conf.json');
    if (!config) {
        const newConfig = {
            database: {
                host: 'localhost',
                user: 'root',
                password: '',
                database: ''
            },
            folderName: 'migrations'
        };
        const json = JSON.stringify(newConfig);
        fs.writeFile(process.cwd() + '/migrationjs.conf.json', json, 'utf8', () => {});
    } else {
        throw Error('There is already an migrationjs.conf.json file');
    }
} else {
    process.exit();
}
