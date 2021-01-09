const router = require('express').Router();
const controllers = require('./search.controllers');

router.get("/find", controllers.find);

module.exports = router;