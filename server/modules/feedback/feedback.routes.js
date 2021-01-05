const router = require('express').Router();
const controllers = require('./feedback.controllers');

router.get('/', (req, res, next) => {
    res.status(200).send('Welcome, this is feedback api');
})

router.get("/course_feedback", controllers.getFeedBackByCourseID);

module.exports = router;
