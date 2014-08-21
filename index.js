/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 Riptide Cloud
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

(function (module, util, winston, logentries) {
    /**
     * Logentries class
     *
     * @description constructor for the Logentries transport
     *
     * @param {object}       options                 options for your Logentries transport
     * @param {string}       options.token           Required. Logentries destination token uuid
     * @param {Boolean}      options.secure          Optional. Use tls for communication, default is false
     * @param {Object}       options.levels          Optional. Custom log levels, default is syslog-style
     * @param {Boolean}      options.printerror      Optional. Print errors to STDERR with console.error, default is true
     * @param {Boolean}      options.timestamp       Optional. Autogenerate a timestamp, default is true
     * @param {Boolean}      options.usequotes       Optional. Add double quotes around every field, default is false
     *
     * @type {Function}
     */
    var Logentries = module.exports.Logentries = function (options) {
        if (!(Logentries.is(this))) {
            return new Logentries(options);
        }

        var self = this;
        options = options || {};

        self.name = 'logentries';
        self.level = options.level || 'info';
        if (!options.token) {
            throw new Error('Missing require parameter: token');
        }

        self.logger = logentries.logger(options);
    };

    Logentries.is = function(obj) {
        return obj instanceof Logentries;
    };

    // Inherit from `winston.Transport` to take advantage of the base functionality and `.handleExceptions()`.
    util.inherits(Logentries, winston.Transport);

    Logentries.prototype.log = function (level, msg, meta, callback) {
        var self = this;

        // make sure we handle when meta isn't provided
        if (typeof(meta) === 'function' && !callback) {
            callback = meta;
            meta = false;
        }

        if (meta && typeof meta === 'object' && Object.keys(meta).length === 0) {
            meta = false;
        }

        var output = msg;

        // If we don't have a string for the message,
        // lets transform it before moving on
        if (typeof(output) !== 'string') {
            output = JSON.stringify(output, null, 2);
        }

        if (meta) {
            if (typeof meta !== 'object') {
                output += ' ' + meta;
            } else {
                output += ' ' + JSON.stringify(meta, null, 2);
            }
        }

        self.logger.log(level, output);
        callback(null, true);
    };

    // Define a getter so that `winston.transports.Logentries` is available and thus backwards compatible.
    winston.transports.Logentries = Logentries;
}(module, require('util'), require('winston'), require('node-logentries')));