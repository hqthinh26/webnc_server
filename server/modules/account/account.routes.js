const router = require('express').Router();
const auth = require('../../middleware/auth.controllers');
const controllers = require('./account.controllers');

/**
 * API endpoint - /api/accounnt/...
 */


/**
 * Function: Tạo tài khoản người dùng.
 * code: 200 - Thành công
 * code: 201 - Người dùng đã tồn tại
 */
router.post('/create', controllers.create);

/**
 * Function: Đăng nhập
 * code: 200 - Thành công
 * code: 201 - Tài khoản không tôn tại
 * code: 202 - Sai tài khoản / mật khẩu
 */
router.get('/login', controllers.login);


router.delete('/logout', controllers.logout);


module.exports = router;