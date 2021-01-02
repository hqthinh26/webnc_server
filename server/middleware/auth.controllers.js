const responseHanlder = require("../response_handler");
const jwt = require("jsonwebtoken");
const services = require("./auth.services");
const Joi = require("joi");

const authMessages = {
  tokenIsEmpty: "token is required",
  tokenIsNotValid: "Token is not valid",
};

exports.isAuthenticate = async (req, res, next) => {
  try {
    const authorization = req.headers["authorization"];
    if (!authorization)
      return next(responseHanlder.error(authMessages.tokenIsEmpty));

    const access_token = authorization.split(" ")[1];

    if (!access_token)
      return next(responseHanlder.error(authMessages.tokenIsNotValid));

    const decoded = await jwt.verify(
      access_token,
      process.env.SUPER_SECRET_KEY
    );

    req.decoded = decoded;
    next();
  } catch (e) {
    next(e);
  }
};

exports.isTokenValid = async (req, res, next) => {
  try {
    const schema = Joi.object({
      access_token: Joi.string().optional().allow(""),
    }).validate(req.query);

    if (schema.error)
      return next(responseHanlder.validationError(schema.error));

    const access_token = schema.value.access_token.split(" ")[1];

    if (!access_token)
      return next(responseHanlder.error(authMessages.tokenIsNotValid));

    const isValid = await services.isTokenValid(access_token);

    if (!isValid) {
      return next(responseHanlder.success(null, "Token không tồn tai", 201));
    }

    return next(responseHanlder.success(null));

    next();
  } catch (e) {
    next(e);
  }
};
