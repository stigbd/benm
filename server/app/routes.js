var home = require('../controllers/home'),
contacts = require('../controllers/contacts');

module.exports.initialize = function(app, router) {
    router.get('/', home.index);
    router.get('/api/contacts', contacts.index);
    router.get('/api/contacts/:id', contacts.getById);
    router.post('/api/contacts', contacts.add);
    router.put('/api/contacts', contacts.update);
    router.delete('/api/contacts/:id', contacts.delete);

    app.use('/', router);
};
