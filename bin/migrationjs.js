#!/usr/bin/env node
const args = require('process.args')();
const {Command} = require('../src/commands/command');
const {registerCommands} = require('../src/commands/command.registry');

registerCommands();

const arguments = Object.keys(args);

const command = Command.get(arguments[2]);

console.time('run');

command.run(arguments[3]).then(() => {
    console.timeEnd('run');
    process.exit();
});
