# Kai2

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
```bash
$ kai google how to make a cake
```

### Entertaining
```bash
$ kai tell me a joke
```

### Verbose mode (for debugging)
```bash
$ kai tell me a joke -v
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