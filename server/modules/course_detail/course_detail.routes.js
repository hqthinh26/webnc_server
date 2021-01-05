const router = require('express').Router();
const controllers = require('./course_detail.controllers');

router.get("/", (req, res, next) => {
    res.status(200).send('this is course detail api');
})

router.get("/detail", controllers.getCourseDetailByID);


module.exports = router;
