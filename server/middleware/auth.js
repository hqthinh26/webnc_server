const responseHanlder = require("../response_handler");
const jwt = require("jsonwebtoken");

const authMessages = {
  tokenIsEmpty: "token is required",
  tokenIsNotValid: "Token is not valid",
};

exports.isAuthenticate = async (req, res, next) => {
  try {
    const authorization = req.headers["authorization"];
    if (!authorization) return next(responseHanlder.error(authMessages.tokenIsEmpty));

    const access_token = authorization.split(' ')[1];

    if (!access_token) return next(responseHanlder.error(authMessages.tokenIsNotValid));

    const payload = await jwt.verify(
      access_token,
      process.env.SUPER_SECRET_KEY
    );

    next();
  } catch (e) {
    next(e);
  }
};
