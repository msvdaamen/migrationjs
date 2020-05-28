#!/usr/bin/env node
const args = require('process.args')();
const {migrate} = require('../src/index');

if (args.hasOwnProperty('migrate')) {
    const config = require(process.cwd() + '/migrationjs.conf.json');
    if (!config) {
        throw Error('No migrationjs.conf.json in project root');
    }
    migrate(process.cwd(), config).then(() => {
        process.exit();
    });
} else {
    process.exit();
}
