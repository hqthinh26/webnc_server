const Joi = require("joi");
const bcrypt = require("bcryptjs");

const responseHandler = require("../../response_handler");
const services = require("./account.services");

const responseMessage = {
  accountNameTaken: "Người dùng đã tồn tại",
  createAccountFailed: "Tạo người dùng mới thất bại",
  accountNameDoNotExist: "Người dùng không tồn tại",
  accountInvalid: "Sai tài khoản/mật khẩu",
};

/**
 * POST => use req.body
 * @param {username: text}
 * @param {pw: text}
 * @param {full_name: text}
 * @param {email: text}
 * @param {age: integer}
 */
exports.create = async (req, res, next) => {
  try {
    const schema = Joi.object({
      account_name: Joi.string().required(),
      pw: Joi.string().required(),
      repeat_pw: Joi.ref("pw"),
      full_name: Joi.string().required(),
      email: Joi.string(),
      age: Joi.number(),
    }).validate(req.body);

    if (schema.error)
      return next(responseHandler.validationError(schema.error));

    //check if the username has been taken
    const isTaken = await services.isAccountNameTaken(
      schema.value.account_name
    );
    if (isTaken)
      return next(responseHandler.error(responseMessage.accountNameTaken));

    const createAccount = await services.createAccount(schema.value);
    if (createAccount.length === 0)
      return next(responseHandler.error(responseMessage.createAccountFailed));

    next(
      responseHandler.success(
        `Thêm người dùng thành công ID: ${createAccount[0]}`
      )
    );
  } catch (e) {
    next(e);
  }
};

exports.login = async (req, res, next) => {
  try {
    const schema = Joi.object({
      account_name: Joi.string().required(),
      pw: Joi.string().required(),
    }).validate(req.query);

    console.log("this is req.query", req.query);

    if (schema.error)
      return next(responseHandler.validationError(schema.error));

    const isTaken = await services.isAccountNameTaken(
      schema.value.account_name
    );

    if (!isTaken)
      return next(responseHandler.error(responseMessage.accountNameDoNotExist));

    console.log('this is account detail', isTaken);
    
    const isPwMatched = await bcrypt.compare(schema.value.pw, isTaken.pw);

    if (!isPwMatched) return next(responseHandler.error(responseMessage.accountInvalid));

    next(responseHandler.success('Đăng nhập thành công'));

  } catch (e) {
    next(e);
  }
};
