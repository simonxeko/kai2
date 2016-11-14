# Kai2

Finally, something make your bash smarter, and it's managed by npm.

# Install

Install the tool
```bash
npm install kai2
```

Bind it with your bash
```bash
echo "alias kai='source kai2sh'" >> ~/.bashrc
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