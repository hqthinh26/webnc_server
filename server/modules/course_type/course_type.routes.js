const router = require('express').Router();
const controllers = require("./course_type.controllers");

router.get("/list", controllers.getList);

module.exports = router;