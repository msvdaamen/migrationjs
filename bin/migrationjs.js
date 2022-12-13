#!/usr/bin/env node
const args = require('process.args')();

const {Command} = require('../src/commands/command');
const {registerCommands} = require('../src/commands/command.registry');

registerCommands();

const argsParsed = Object.keys(args);

const command = Command.get(argsParsed[2]);

command.run(argsParsed[3]).then(() => {
    process.exit();
});
