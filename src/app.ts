const shell = require("shelljs");
const argv = process.argv;

let sentence = argv.slice(2).join(" ");

var commands: Array<{pattern: RegExp, handler: Function}> = [];

// TODO: Integration with Api.ai to the top layer.

// Basic Module ( shortcut and note memory )
commands.push({ pattern: /^go to (.+)$/i, handler: onGoto });
commands.push({ pattern: /^remember (.+) as (.+)$/i, handler: onRemember });
commands.push({ pattern: /^(remember|record|note|save|memo) (['"]?.+['"]?) (as)? (['"]?.+?['"]?)$/i, handler: onRemember }); // kai remember here as 'webdev' -> kai goto webdev
commands.push({ pattern: /^where[ ]?is[ ]?(.+)$/i, handler: onWhere });

// Google
commands.push({ pattern: /^google (.+)$/, handler: onGoogle });

// Joke Module
commands.push({ pattern: /^tell me a joke$/, handler: onCatFact });

function onGoto(result) {
    shell.exec(`cd {path}`)
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