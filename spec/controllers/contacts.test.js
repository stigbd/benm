var proxyquire = require('proxyquire'),
modelsStub = {},
md5Stub = function(string) { return string; },
contacts = proxyquire('../../controllers/contacts', {
    '../app/models' : modelsStub,
    'md5': md5Stub
});

var res = {},
req = {};

describe('Contacts Controller', function() {
    beforeEach(function() {
        res = {
            json: sinon.spy()
        };
        req = {
            params: {
                id : 1
            }
        };
        modelsStub.Contact = {
            find: function(query, callback) {
                callback(null, {});
            },
            save: function(err, callback) {
                callback(null, req.body);
            }
        };
    });

    it('should exist', function() {
        expect(contacts).to.exist;
    });

    describe('index', function() {
        it('should be defined', function() {
            expect(contacts.index).to.be.a('function');
        });

        it('should send json', function() {
            contacts.index(req, res);
            expect(res.json).calledOnce;
        });
    });

    describe('getById', function() {
        it('should be defined', function() {
            expect(contacts.getById).to.be.a('function');
        });

        it('should send status 200 on successful retrieve', function() {
            contacts.getById(req, res);
            expect(res.statusCode).to.equal(200);
        });

        it('should send json on successful retrieve', function() {
            contacts.getById(req, res);
            expect(res.json).calledOnce;
        });

        it('shold send json error on error', function() {
            modelsStub.Contact = {
                find: function(query, callback) {
                    callback(null, {error: 'Contact not found.'});
                }
            };
            contacts.getById(req, res);
            expect(res.json).calledWith({error: 'Contact not found.'});
        });
    });

    describe('add', function() {
        //todo
    });

    describe('delete', function() {
        //todo
    });
});
