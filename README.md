# Kai2

Finally, something make your Bash smarter, and it's managed by npm!

# Install

Install the tool
```bash
npm install kai2
```

Bind it with your Bash client
```bash
source kai2install
```

# Usage

### Cross directory shortcut
```bash
$ kai remember . as apache config
$ kai go to apache config 
```

### Google (this will open a new window)
```bash
$ kai google how to make a cake
```

### Entertainment
```bash
$ kai tell me a joke
```

### Verbose mode (for debugging)
```bash
$ kai tell me a joke -v
```

# Build

This library is written in typescript. So you need to install a bundle of packages to start.

### Initiating packages
```bash
$ npm i
```

### Compiling typescripts
```bash
$ gulp
```

### Runtime compiling
```bash
$ gulp watch
```