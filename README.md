# winston-logentries

[![NPM version](https://badge.fury.io/js/winston-logentries.svg)](http://badge.fury.io/js/winston-logentries)
[![Bower version](https://badge.fury.io/bo/winston-logentries.svg)](http://badge.fury.io/bo/winston-logentries)
[![Build Status](https://travis-ci.org/RiptideCloud/winston-logentries.svg?branch=master)](https://travis-ci.org/RiptideCloud/winston-logentries)
[![Coverage Status](https://img.shields.io/coveralls/RiptideCloud/winston-logentries.svg?branch=master)](https://coveralls.io/r/RiptideCloud/winston-logentries)

A [Logentries](https://logentries.com) transport for [Winston](https://github.com/flatiron/winston).

## Install

#### NPM
```bash
$ npm install winston-logentries
```

## Node.js
```js
var winston = require('winston');
var Logentries = require('winston-logentries').Logentries;

winston.add(new Logentries({ token: 'YOUR TOKEN HERE' });
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