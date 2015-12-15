/* jshint -W030 */
var home = require('../../server/controllers/home');

var res = {},
req = {};

describe('Home Controller', function() {

    it('should exist', function() {
        expect(home).to.exist;
    });

    describe('index', function() {
        it('should be defined', function() {
            expect(home.index).to.be.a('function');
        });
    });
});
