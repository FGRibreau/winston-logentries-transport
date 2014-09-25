# winston-logentries-transport-with-rewriter (fork)

[![NPM version](https://badge.fury.io/js/winston-logentries-transport-with-rewriter.svg)](http://badge.fury.io/js/winston-logentries-transport-with-rewriter)
[![Build Status](https://travis-ci.org/FGRibreau/winston-logentries-transport.svg?branch=master)](https://travis-ci.org/FGRibreau/winston-logentries-transport)
[![Coverage Status](https://coveralls.io/repos/FGRibreau/winston-logentries-transport/badge.png?branch=master)](https://coveralls.io/r/FGRibreau/winston-logentries-transport?branch=master)

A [Logentries](https://logentries.com) transport for [Winston](https://github.com/flatiron/winston).

## [FORK] 

### 0.0.2 Added support for a rewriter configuration option
* `rewriter` (Function(level, msg, meta) -> [level, msg, meta]) Optional. Specify a rewriter


## Install

#### NPM
```bash
$ npm install winston-logentries-transport-with-rewriter
```

## Node.js
```js
var winston = require('winston');
var Logentries = require('winston-logentries-transport-with-rewriter').Logentries;

winston.add(Logentries, { token: 'YOUR TOKEN HERE' });
```

## Configuration Options
When you create the transport you can supply the following options:
* `token` (string) Required. Logentries destination token uuid
* `secure` (Boolean) Optional. Use tls for communication, default is false
* `levels` (Map) Optional. Custom log levels, default is syslog-style
* `printerror` (Boolean) Optional. Print errors to STDERR with console.error, default is true
* `timestamp` (Boolean) Optional. Autogenerate a timestamp, default is true
* `usequotes` (Boolean) Optional. Add double quotes around every field, default is false


## License

  [MIT](LICENSE)
