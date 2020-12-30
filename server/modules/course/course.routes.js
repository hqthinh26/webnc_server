const router = require("express").Router();
const controllers = require('./course.controllers');

router.get("/list", controllers.getList);

module.exports = router;