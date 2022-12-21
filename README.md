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

### Installation
> npm i -g migrationjs

### Commands
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

### Contributors
<div style="display: flex; justify-content: space-around">
    <div style="width: 30%">
        <img alt="msvdaamen" src="https://avatars.githubusercontent.com/u/17142556?v=4">
        <a href="https://github.com/msvdaamen">msvdaamen</a>
    </div>
    <div style="width: 30%">
        <img alt="joel2play" src="https://avatars.githubusercontent.com/u/55430601?v=4">
        <a href="https://github.com/joel2play">joel2play</a>
    </div>
</div>
