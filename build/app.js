#! /usr/bin/env node

const shell = require("shelljs");
const argv = process.argv;
let sentence = argv.slice(2).join(" ");
var commands = [];
commands.push({ pattern: /^go to (.+)$/i, handler: onGoto });
commands.push({ pattern: /^remember (.+) as (.+)$/i, handler: onRemember });
commands.push({ pattern: /^(remember|record|note|save|memo) (['"]?.+['"]?) (as)? (['"]?.+?['"]?)$/i, handler: onRemember });
commands.push({ pattern: /^where[ ]?is[ ]?(.+)$/i, handler: onWhere });
commands.push({ pattern: /^google (.+)$/, handler: onGoogle });
commands.push({ pattern: /^tell me a joke$/, handler: onCatFact });
function onGoto(result) {
    shell.exec(`cd {path}`);
}
function onRemember(result) {
}
function onWhere(result) {
}
function onGoogle(result) {
}
function onCatFact(result) {
}
console.log("user enter", sentence);

//# sourceMappingURL=app.js.map
