/* jshint -W030 */
var seeder = require('../../server/app/seeder');
var mongoose = require("mongoose");
var Contact = require('../../server/app/models').Contact;

describe('Seeder', function() {

    before(function (done) {
        mongoose.connect('mongodb://localhost/db-test', function(){
            mongoose.connection.db.dropDatabase(function(){
                done();
            });
        });
    });

    it('should exist', function() {
        expect(seeder).to.exist;
    });

    it('should be defined', function() {
        expect(seeder.check).to.be.a('function');
    });

    it('should result in non-empty db', function() {
        seeder.check();
        //expect_what???
    });
});
