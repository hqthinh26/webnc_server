const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const responseHandler = require("../../response_handler");
const services = require("./account.services");
const tokenServices = require("../token/token.services");

const responseMessage = {
  accountNameTaken: "Người dùng đã tồn tại",
  createAccountFailed: "Tạo người dùng mới thất bại",
  accountNameDoNotExist: "Người dùng không tồn tại",
  accountInvalid: "Sai tài khoản/mật khẩu",
};

// NOTE: decoded = {
//   id,
//   account_name,
//   full_name,
//   role_id,
// };

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

exports.detail = async (req, res, next) => {
  try {
    const { id } = req.decoded;
    const detail = await services.accountDetail(id);
    if (!detail) return next(responseHandler.error("Người dùng không tồn tại"));
    return next(responseHandler.success(detail));
  } catch (e) {
    next(e);
  }
};

exports.update = async (req, res, next) => {
  try {
    console.log('this is update body', req.body);
    const schema = Joi.object({
      full_name: Joi.string().required(),
      email: Joi.string().required(),
      age: Joi.number().optional().allow(null),
    }).validate(req.body);

    if (schema.error) return next(responseHandler.validationError(schema.error));

    const result  = await services.updateAccount(req.decoded.id, schema.value);
    console.log('this is update result', result);
    next(responseHandler.success(result));
  } catch (e) {
    next(e);
  }
}

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
      email: Joi.string().optional().allow(""),
      //age: Joi.number(), //omited
    }).validate(req.body);

    if (schema.error)
      return next(responseHandler.validationError(schema.error));

    //check if the username has been taken
    const isTaken = await services.isAccountNameTaken(
      schema.value.account_name
    );
    if (isTaken)
      return next(responseHandler.error(responseMessage.accountNameTaken, 201));

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

    if (schema.error)
      return next(responseHandler.validationError(schema.error));

    //isTaken contains all the columns of the account
    /**
     * @value {isTaken}
     * @value {isTaken.id}
     * @value {isTaken.account_name}
     * @value {isTaken.pw}
     * @value {isTaken.full_name}
     * @value {isTaken.email}
     * @value {isTaken.age}
     * @value {isTaken.role_id}
     */
    const isTaken = await services.isAccountNameTaken(
      schema.value.account_name
    );

    if (!isTaken)
      return next(
        responseHandler.error(responseMessage.accountNameDoNotExist, 201)
      );

    const isPwMatched = await bcrypt.compare(schema.value.pw, isTaken.pw);

    if (!isPwMatched)
      return next(responseHandler.error(responseMessage.accountInvalid, 202));

    const { id, account_name, full_name, role_id } = isTaken;

    const payload = {
      id,
      account_name,
      full_name,
      role_id,
    };

    const token = await jwt.sign(payload, process.env.SUPER_SECRET_KEY, {expiresIn: 600});

    await tokenServices.create({
      account_id: id,
      token,
      //expired_at: moment().add(10, 'm').add(7, 'h'), 
      expired_at: moment().add(7,'d').add(7,'h'),
    });

    next(
      responseHandler.success({
        message: "Đăng nhập thành công",
        token,
        role_id,
      })
    );
  } catch (e) {
    next(e);
  }
};

const authMessages = {
  tokenIsEmpty: "token is required",
  tokenIsNotValid: "Token is not valid",
  tokenIsNotInDB: "Không tồn tại token trong DB",
};


exports.logout = async (req, res, next) => {
  try {
    const authorization = req.headers["authorization"];

    if (!authorization)
      return next(responseHandler.error(authMessages.tokenIsNotValid));

    const accessToken = authorization.split(" ")[1];

    if (!accessToken)
      return next(responseHandler.error(authMessages.tokenIsNotValid));

    //staus returns the number of affected rows
    const status = await tokenServices.delete(accessToken);

    if (status === 0)
      return next(responseHandler.error(authMessages.tokenIsNotInDB));

    next(responseHandler.success([], "Token is removed"));
  } catch (e) {
    next(e);
  }
};
