const router = require('express').Router();
const controllers = require('./account.controllers');

router.post('/add', controllers.addNewAccount);

router.get('/list', controllers.getList);

module.exports = router;