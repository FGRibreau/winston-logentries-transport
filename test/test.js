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
(function (require, should, LogentriesTransport, winston) {
    describe('Winston Logentries Transport', function () {
        it('Shouldn\'t be able to be instantiated without any options', function (done) {
            (function () {
                new LogentriesTransport();
            }).should.throw('Missing require parameter: token');
            done();
        });
        it('Shouldn\'t be able to be instantiated with an empty options object', function (done) {
            (function () {
                new LogentriesTransport({});
            }).should.throw('Missing require parameter: token');
            done();
        });
        it('Shouldn\'t be able to be instantiated with a falsey token', function (done) {
            (function () {
                new LogentriesTransport({ token: '' });
            }).should.throw('Missing require parameter: token');
            done();
        });
        it('Should be able to be instantiated with a token', function (done) {
            var transport = new LogentriesTransport({ token: 'test' });
            (transport instanceof LogentriesTransport).should.be.true;
            winston.transports.Logentries.should.be.type('function');
            done();
        });
        it('Should be able to be instantiated without using the new keyword', function (done) {
            var transport = LogentriesTransport({ token: 'test' });
            (transport instanceof LogentriesTransport).should.be.true;
            winston.transports.Logentries.should.be.type('function');
            done();
        });
        it('Should be able to be instantiated with all options', function (done) {
            var transport = new LogentriesTransport({
                token: 'test',
                secure: true,
                levels: {
                    debug: 0,
                    info: 1,
                    warn: 2,
                    error: 3
                },
                printerror: true,
                timestamp: true,
                usequotes: true
            });
            (transport instanceof LogentriesTransport).should.be.true;
            winston.transports.Logentries.should.be.type('function');
            transport.log('info', 'test', { test: 'test' }, function() {});
            done();
        });
        it('Should be able to log with no meta provided', function (done) {
            var transport = new LogentriesTransport({
                token: 'test'
            });
            (transport instanceof LogentriesTransport).should.be.true;
            winston.transports.Logentries.should.be.type('function');
            transport.log('info', 'test', function() {});
            done();
        });
        it('Should be able to log with an object as the message', function (done) {
            var transport = new LogentriesTransport({
                token: 'test'
            });
            (transport instanceof LogentriesTransport).should.be.true;
            winston.transports.Logentries.should.be.type('function');
            transport.log('info', { name: 'Malcolm Reynolds' }, function() {});
            done();
        });
        it('Should be able to log with a string as the meta', function (done) {
            var transport = new LogentriesTransport({
                token: 'test'
            });
            (transport instanceof LogentriesTransport).should.be.true;
            winston.transports.Logentries.should.be.type('function');
            transport.log('info', 'test', 'I am C-3P0, human-cybord relations.', function() {});
            done();
        });
        it('Should be able to log with an empty meta object', function (done) {
            var transport = new LogentriesTransport({
                token: 'test'
            });
            (transport instanceof LogentriesTransport).should.be.true;
            winston.transports.Logentries.should.be.type('function');
            transport.log('info', 'test', {}, function() {});
            done();
        });
    })
}(require, require('should'), require('../index').Logentries, require('winston')));