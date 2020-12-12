const { response } = require("express");
const { number } = require("joi");
const Joi = require("joi");

const responseHandler = require("../../response_handler");
const services = require("./account.services");

const responseMessage = {
  accountNameTaken: "Người dùng đã tồn tại",
  createAccountFailed: "Tạo người dùng mới thất bại",
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

    console.log(' this is body', schema.value);

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

    console.log("value of CreateAccount", createAccount);

    next(
      responseHandler.success(
        `Thêm người dùng thành công ID: ${createAccount[0]}`
      )
    );
  } catch (e) {
    next(e);
  }
};
