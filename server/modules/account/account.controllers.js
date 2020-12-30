const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

const responseHandler = require("../../response_handler");
const services = require("./account.services");
const refereshTokenServices = require("../refresh_token/referesh_token.services");

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
  console.log('this is body', req.body);
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

    const { id, account_name, full_name } = isTaken;

    const payload = {
      id,
      account_name,
      full_name,
    };

    const token = await jwt.sign(payload, process.env.SUPER_SECRET_KEY, {expiresIn: '1d'});

    //This is a new refresh_token row
    const addToTokenTable = {
      account_id: id,
      token: token,
      //+1 day for expired time && 7h for local time
      expired_at: moment().add(1,'d').add(7, 'h'),
    };

    await refereshTokenServices.create(addToTokenTable);

    next(
      responseHandler.success({
        message: "Đăng nhập thành công",
        token,
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
    const authorization = req.headers['authorization'];
    console.log('this is authozaad', authorization);

    if (!authorization) return next(responseHandler.error(authMessages.tokenIsNotValid));

    const accessToken = authorization.split(" ")[1];

    if (!accessToken) return next(responseHandler.error(authMessages.tokenIsNotValid));


    //staus returns the number of affected rows
    const status = await refereshTokenServices.delete(accessToken);

    if (status === 0) return next(responseHandler.error(authMessages.tokenIsNotInDB));

    next(responseHandler.success([], 'Delete token successfully'));
  } catch (e) {
    next(e);
  }
}
