const router = require("express").Router();
const controllers = require("./course.controllers");
const auth = require("../../middleware/auth.controllers");

router.get("/list", controllers.getList);

router.post("/create", auth.isAuthenticate, controllers.create);

module.exports = router;
