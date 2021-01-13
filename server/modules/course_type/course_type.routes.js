const router = require('express').Router();
const controllers = require("./course_type.controllers");

/**
 * /api/course_type/list
 */
router.get("/list", controllers.getList);

module.exports = router;