#!/usr/bin/env node
const args = require('process.args')();
const {migrate} = require('../src/index');

if (args.hasOwnProperty('migrate')) {
    migrate(process.cwd()).then(() => {

    });
} else {
    process.exit()
}
