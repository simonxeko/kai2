#! /usr/bin/env node

"use strict";
const fs = require('fs');
const colors = require('colors');
const os = require('os');
const shell = require("shelljs");
const fetch = require('node-fetch');
const spawn = require('child_process').spawn;
const cheerio = require('cheerio');
const argv = process.argv;
let verbose = false;
let debug = (str) => {
    if (verbose) {
        console.log(str.grey);
    }
};
if (argv.indexOf('-v') > 0) {
    verbose = true;
    argv.splice(argv.indexOf('-v'), 1);
}
const USER_HOME = os.homedir();
let C = {};
let initJSON = "";
try {
    initJSON = fs.readFileSync(`${USER_HOME}/.kai/settings.json`, 'utf-8').toString();
    C = JSON.parse(initJSON);
}
catch (e) {
    if (e.name == "SyntaxError") {
        console.log(("Syntax Error in ~/.kai/settings.json").red);
        process.exit(-1);
    }
    try {
        fs.mkdirSync(`${USER_HOME}/.kai`);
    }
    catch (eMkdir) {
    }
    fs.writeFileSync(`${USER_HOME}/.kai/settings.json`, '{}');
    C = {};
}
let sentence = argv.slice(2).join(" ");
var patterns = [];
patterns.push({ re: /^(go[ ]?to|jump[ ]?to) (.+)$/, handler: onGoto });
patterns.push({ re: /^(forget|forgot|delete|remove) (.+)$/, handler: onForget });
patterns.push({ re: /^(remember|record|note|save|memo) (['"]?.+['"]?) (as)? (['"]?.+?['"]?)$/, handler: onRemember });
patterns.push({ re: /^where[ ]?is[ ]?(.+)$/, handler: onWhere });
patterns.push({ re: /^(set key|unset key|get key) ([^ ]+)[ ]?[=]?[ ]?(.*)$/, handler: onSet });
patterns.push({ re: /^(run|exec|r|e) (.+)$/, handler: onRun });
patterns.push({ re: /^google (.+)$/, handler: onGoogle });
patterns.push({ re: /^(stackoverflow|stack) (.+)$/, handler: onStackoverflow });
patterns.push({ re: /^tell me a joke$/, handler: onJoke });
function onGoto(result) {
    let key = result[2];
    let path = C.shortcut[key];
    if (!path) {
        console.log(`I don't know where ${key} is.`);
    }
    else {
        console.log(`Jumping to ${path}`);
        console.log(`cd ${path}`);
    }
}
function onRun(result) {
    let key = result[2];
    let cmd = C.shortcut[key];
    if (!cmd) {
        console.log(`I don't know what ${key} means.`);
    }
    else {
        console.log(`Executing ${cmd}`);
        let child = shell.exec(cmd, { async: true });
        child.stdout.on('data', (data) => {
            console.log(data);
        });
        child.stderr.on('data', (data) => {
            console.log(data);
        });
    }
}
function onForget(result) {
    let key = result[2];
    let path = C.shortcut[key];
    if (!path) {
        console.log(`${key} means nothing to me.`);
    }
    else {
        console.log(`OK, I'll forget ${key} (${path})`);
        delete C.shortcut[key];
    }
}
function onRemember(result) {
    let path = result[2], key = result[4];
    if (!C.shortcut) {
        C.shortcut = {};
    }
    if (path === "." || path === "here" || path === "this folder")
        path = process.cwd();
    C.shortcut[key] = path;
    console.log(`Remembering ${path} as ${key}`.green);
}
function onWhere(result) {
    let key = result[1];
    let path = C.shortcut[key];
    if (!path) {
        console.log(`I don't know where ${key} is.`);
    }
    else {
        console.log(`It is located at ${path}`);
    }
}
function onGoogle(result) {
    spawn('open', ['https://www.google.com.tw/webhp?ie=UTF-8#q=' + encodeURIComponent(result[1])]);
}
function onJoke(result) {
    fetch('http://tambal.azurewebsites.net/joke/random').then(function (res) {
        return res.json();
    }).then(function (json) {
        console.log(json.joke);
    });
}
function onSet(result) {
    let cmd = result[1], key = result[2], val = result[3];
    if (!C.keys) {
        C.keys = {};
    }
    if (!~['google_cx', 'google_api_key'].indexOf(key)) {
        console.log("Key ${key} not supported");
    }
    if (cmd == "unset key") {
        delete C.keys[key];
        console.log(`Key ${key} deleted.`);
    }
    else if (cmd == "get key") {
        console.log(`Key "${key}" = "${C.keys[key]}".`);
    }
    else if (val && cmd == "set key") {
        C.keys[key] = val;
        console.log(`Setting "${key}" = "${val}".`);
    }
}
function onStackoverflow(result) {
    let parsingLink = false;
    let linkName = "";
    let pageLink = "";
    if (!C.keys || !C.keys['google_cx'] || !C.keys['google_api_key']) {
        return console.log('You must run `kai set google_cx = [your custom search engine index]` & `kai set google_api_key = [your google api key]` first. See https://developers.google.com/custom-search/json-api/v1/overview.');
    }
    let url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(result[2])}&cx=${C.keys['google_cx']}&key=${C.keys['google_api_key']}`;
    console.log("By the power of " + "Google".rainbow + " ...\n");
    fetch(url).then((res) => {
        return res.json();
    }).then((result) => {
        result.items.map((v, i) => {
            if (i != 0)
                return;
            console.log(`*** ${v.title} ***`);
            fetch(v.link).then(res => res.text()).then((html) => {
                let $ = cheerio.load(html);
                console.log($('.answer.accepted-answer .post-text').text());
            });
        });
    });
}
debug("Sentence " + sentence);
let matches = [];
patterns.map((v) => {
    let result = v.re.exec(sentence);
    if (result) {
        matches.push({ result: result, pattern: v });
    }
});
if (matches.length > 1) {
    debug("DEBUG:: Command matched twice".red);
}
matches.map((v) => {
    debug("Matched " + v.pattern.re.source);
    v.pattern.handler(v.result);
});
let endJSON = JSON.stringify(C);
if (initJSON != endJSON) {
    fs.writeFileSync(`${USER_HOME}/.kai/settings.json`, endJSON + "\n");
}
if (sentence == "") {
    console.log("Hi! How may I help you? Checkout more information at https://github.com/simonxeko/kai2");
}
else if (matches.length == 0) {
    console.log("I don't quite understand the command.");
}

//# sourceMappingURL=app.js.map
