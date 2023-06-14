#!/usr/bin/env node

import {Migration} from './main/migration';
import {Schema} from './main/schema.js';
import {Blueprint} from './main/blueprint';
import {query} from "./db/connection";
import {registerCommands} from "./commands/command.registry";
import {Command} from "./commands/command";

export {
    Migration,
    Schema,
    Blueprint,
    query
}

const args = require('process.args')();

registerCommands();

const argsParsed = Object.keys(args);

const command = Command.get(argsParsed[2]);

command.run(argsParsed[3]).then(() => {
    process.exit();
});
