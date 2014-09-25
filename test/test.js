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
                usequotes: true,
                rewriter: function(level, msg, meta){
                    return [level, 'APP: ' + msg, meta];
                }
            });
            (transport instanceof LogentriesTransport).should.be.true;
            winston.transports.Logentries.should.be.type('function');
            transport.logger.log = function(level, output){
                output.should.startWith('APP:');
                done();
            };
            transport.log('info', 'test', { test: 'test' }, function() {});
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
