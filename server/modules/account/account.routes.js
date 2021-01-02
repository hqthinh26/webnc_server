const router = require('express').Router();
const auth = require('../../middleware/auth.controllers');
const controllers = require('./account.controllers');

/**
 * @apiNote @API_endpoint - /api/accounnt/...
 */

/**
 * @api Get Account Detail
 */
router.get("/detail", auth.isAuthenticate, controllers.detail);


/**
 * @api Update Account Info
 */
router.put("/update", auth.isAuthenticate, controllers.update);


/**
 * Function: Tạo tài khoản người dùng.
 * @param code: 200 - Thành công
 * @param code: 201 - Người dùng đã tồn tại
 */
router.post('/create', controllers.create);

/**
 * Function: Đăng nhập
 * @param code: 200 - Thành công
 * @param code: 201 - Tài khoản không tôn tại
 * @param code: 202 - Sai tài khoản / mật khẩu
 */
router.get('/login', controllers.login);


router.delete('/logout', controllers.logout);




module.exports = router;