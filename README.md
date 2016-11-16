# Kai2

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

Time is money. Kai makes your Bash smarter and save your time.

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