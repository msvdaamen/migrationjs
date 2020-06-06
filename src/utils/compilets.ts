const ts = require("typescript")
const fs = require("fs");
const path = require('path');

export async function compileTsFiles(globalPath, migrationsPath, file: string) {
    const tsFile = fs.readFileSync(path.join(globalPath, migrationsPath, file), 'utf8');
    const result = ts.transpileModule(tsFile, {module: ts.ModuleKind.CommonJS, allowJs: true});
    return requireFromString(result.outputText);
}

function requireFromString(src, filename = '') {
    // @ts-ignore
    var m = new module.constructor();
    m.paths = module.paths;
    m._compile(src, filename);
    return m.exports;
}
