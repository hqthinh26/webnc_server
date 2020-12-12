const router = require('express').Router();
const controllers = require('./account.controllers');
/**
 * Function: Tạo tài khoản người dùng.
 */
router.post('/create', controllers.create);

module.exports = router;