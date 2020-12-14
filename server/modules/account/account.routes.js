const router = require('express').Router();
const controllers = require('./account.controllers');
/**
 * Function: Tạo tài khoản người dùng.
 * code: 200 - Thành công
 */
router.post('/create', controllers.create);

/**
 * Function: Đăng nhập
 * code: 200 - Thành công
 * code: 201 - Wrong account_name/pw
 */
router.get('/login', controllers.login);


module.exports = router;