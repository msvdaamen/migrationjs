<style>
* {
    font-family: monospace;
}
h1, h3 {
    color: #7b7bff;
}

a {
    color: #7b7bff;
    text-align: center;
    display: block;
}

img {
    width: 100%;
}
</style>
# MigrationJS

MigrationJS is a database migration package for NodeJS.
MigrationJS allows you to create migrations for your database and run them in a specific order. This way it is easy to introduce database changes to you application at ease.


## Installation
> npm i -g migrationjs

## Commands
Commands are composed like this: `migrationjs <command> <args>`  
The available commands are:

> **help**  
> Gets a list of all the commands

> **migrate**  
> This makes a new batch of all the migrations which did not run yet
> and executes the `up` function of those migrations.

> **rollback**  
> This command executes the `down` function of the migrations of the latest batch.  

> **make:migration \<migration name\>**  
> This command creates a migration file. The name has to start with `create` if you want to generate a create-table migration template, or `alter` for an alter-table migration template

> **make:config**  
> This command creates a `migrationjs.conf.json` file where you can configure your settings of MigrationJS.  

## Migration file
A migration file is a file which contains two functions: `up` and `down`. The `up` function is executed when you run `migrationjs migrate` and the `down` function is executed when you run `migrationjs rollback`.
In those methods you may use the Schema object to create tables, alter tables, drop tables, etc. one example is shown below.
```
import {Migration, Blueprint, Schema} from 'migrationjs';


export default class CreateTestTable extends Migration {

    async up() {
        await Schema.create('test', (table: Blueprint) => {
            table.id();
            table.string('name');
        });
    }

    async down() {
        await Schema.dropIfExists('test');
    }
}
```

To run the created migration you have to run `migrationjs migrate` in the terminal. This will create a new batch of migrations and execute the `up` function of the created migration.
To rollback the created migration you have to run `migrationjs rollback` in the terminal. This will execute the `down` function of the created migration.

## Table functions
###### Create tables
To create a table you have to use the `Schema.create` function. This function takes two arguments: the name of the table and a callback function which takes a Blueprint object as argument. The Blueprint object contains all the functions to create a table.
```
await Schema.create('users', (table: Blueprint) => {
    table.id();
    table.string('name');
});
```
###### Updating tables
To update a table you have to use the `Schema.table` function. This function takes two arguments: the name of the table and a callback function which takes a Blueprint object as argument. The Blueprint object contains all the functions to update a table.
```
await Schema.table('users', (table: Blueprint) => {
    table.string('username');
});
```
###### Renaming / Dropping tables
To rename a table you have to use the `Schema.rename` function. This function takes two arguments: the name of the table and the new name of the table.
```
await Schema.rename(from: string, to: string);
```
To drop an existing table you have to use the `Schema.drop` function. This function takes one argument: the name of the table.
```
await Schema.dropIfExists('users'); 
```

[//]: # (## Available Blueprint functions)

[//]: # (The blueprint class contains all the functions to create table column. Each of the available methods are listed in the table below:)



## Contributors
<div style="display: flex; justify-content: space-around">
    <div style="width: 30%">
        <img alt="msvdaamen" src="https://avatars.githubusercontent.com/u/17142556?v=4">
        <a href="https://github.com/msvdaamen">msvdaamen</a>
    </div>

[//]: # (    <div style="width: 30%">)

[//]: # (        <img alt="joel2play" src="https://avatars.githubusercontent.com/u/55430601?v=4">)

[//]: # (        <a href="https://github.com/joel2play">joel2play</a>)

[//]: # (    </div>)
</div>
