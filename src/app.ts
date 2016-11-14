import { Cipher } from 'tls';
import { version } from 'punycode';
import * as vm from 'vm';

const fs = require('fs');
const colors = require('colors');
const os = require('os');
const shell = require("shelljs");
const argv = process.argv;

const USER_HOME = os.homedir();
let C: any = {};
let initJSON = "";

try {
    initJSON = fs.readFileSync(`${USER_HOME}/.kai/settings.json`, 'utf-8').toString();
    C = JSON.parse(initJSON);
} catch (e) {
    if (e.name == "SyntaxError") {
        console.log(("Syntax Error in ~/.kai/settings.json").red);
        process.exit(-1);
    }
    try {
        fs.mkdirSync(`${USER_HOME}/.kai`);
    } catch (eMkdir) {

    }
    fs.writeFileSync(`${USER_HOME}/.kai/settings.json`, '{}');
    C = {};
}

let sentence = argv.slice(2).join(" ");

interface IPattern {
    re: RegExp;
    handler: Function;
}

var patterns: Array<IPattern> = [];

// TODO: Integration with Api.ai to the top layer.

// Basic Module ( shortcut and note memory )
patterns.push({ re: /^(go[ ]?to|jump[ ]?to) (.+)$/, handler: onGoto });
patterns.push({ re: /^(remember|record|note|save|memo) (['"]?.+['"]?) (as)? (['"]?.+?['"]?)$/, handler: onRemember }); // kai remember here as 'webdev' -> kai goto webdev
patterns.push({ re: /^where[ ]?is[ ]?(.+)$/, handler: onWhere });

// Google
patterns.push({ re: /^google (.+)$/, handler: onGoogle });

// Joke Module
patterns.push({ re: /^tell me a joke$/, handler: onJoke });

function onGoto(result) {
    let key = result[2];
    let path = C.shortcut[key];

    if (!path) {
        console.log(`I don't know where ${key} is.`);
    } else {
        console.log(`Jumping to ${path}`);
        process.chdir(path);
    }
}

function onRemember(result) {
    let path = result[2],
        key = result[4];
    if (!C.shortcut) { C.shortcut = {}; }
    if (path === "." || path === "here" || path === "this folder") path = process.cwd();
    C.shortcut[key] = path;
    console.log(`Remembering ${path} as ${key}`.green);
}

function onWhere(result) {
    let key = result[1];
    let path = C.shortcut[key];

    if (!path) {
        console.log(`I don't know where ${key} is.`);
    } else {
        console.log(`It is located at ${path}`);
    }
}

function onGoogle(result) {

}

function onJoke(result) {

}

console.log("user enter", sentence);

let matches:Array<{result: RegExpExecArray, pattern: IPattern}> = [];

patterns.map((v: IPattern) => {
    let result: RegExpExecArray | null = v.re.exec(sentence);
    if (result) {
        matches.push({result: result, pattern: v});
    }
});

if (matches.length > 1) {
    console.log("DEBUG:: Command matched twice".red);
}

matches.map((v: {result: RegExpExecArray, pattern: IPattern}) => {
    console.log("Matched " + v.pattern.re.source);
    v.pattern.handler(v.result);
});

let endJSON = JSON.stringify(C);
if (initJSON != endJSON) {
    fs.writeFileSync(`${USER_HOME}/.kai/settings.json`, endJSON + "\n");
}