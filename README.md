```
 ___  __    ________  ___    _______     
|\  \|\  \ |\   __  \|\  \  /  ___  \    
\ \  \/  /|\ \  \|\  \ \  \/__/|_/  /|   
 \ \   ___  \ \   __  \ \  \__|//  / /   
  \ \  \\ \  \ \  \ \  \ \  \  /  /_/__  
   \ \__\\ \__\ \__\ \__\ \__\|\________\
    \|__| \|__|\|__|\|__|\|__| \|_______|
```

[![NPM](https://nodei.co/npm/kai2.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/kai2/)

Designed for programmers. Kai makes your Bash smarter and save your time.

# Features

1. Switch working folder in an elegant way. 
2. Save short memos in terminal.
3. Save command alias quickly.
4. Check stackoverflow in terminal.

# Installation

Install the tool
```bash
npm install kai2
```

Bind it with your Bash client
```bash
source kai2install
```

# Usage

### Path remembering
```bash
$ kai remember . as apache config
$ kai go to apache config 

$ kai forget apache config
```

### Command memo
```
$ kai remember command 'service start nginx' as nginx
$ kai run nginx
$ kai r nginx
```

### Variable memo
```
$ kai remember 192.168.21.136 as android ip
$ kai show android ip
```

### Searching
Open a new browser window
```bash
$ kai google how to make a cake
```

Stackoverflow in terminal, powered by google search
```bash
$ kai stack get pid of process name os x 
```

### Entertaining
```bash
$ kai tell me a joke
```

### Verbose mode (for debugging)
```bash
$ kai tell me a joke -v
```

### Using API
```bash
$ kai set key google_api_key = [ your google api key ]
$ kai unset key google_api_key = [ your google api key ]
```

# Compiling

This library is written in typescript. So you need to install a bundle of packages to start.

### Installing dependencies
```bash
$ npm i
```

### Building typescripts
```bash
$ gulp
```

### Runtime compiling
```bash
$ gulp watch
```