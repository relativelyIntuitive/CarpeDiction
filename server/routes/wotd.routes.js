const WOTDController = require('../controllers/wotd.controller');



// API routes to handle user CRUD
module.exports = function (app) {
    app.post('/api/wotd/add', WOTDController.add);
    app.get('/api/wotd/latest', WOTDController.latest);
    app.get('/api/wotd/archive', WOTDController.archive);
};