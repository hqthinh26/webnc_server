const responseHanlder = require("../response_handler");
const jwt = require("jsonwebtoken");
const services = require("./auth.services");
const Joi = require("joi");

const authMessages = {
  tokenIsEmpty: "token is required",
  tokenIsNotValid: "Token is not valid",
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
