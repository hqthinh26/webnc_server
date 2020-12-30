module.exports = {
  validationError: (err) => {
    return {
      httpCode: 400,
      error: true,
      message: err.details,
      data: null,
    };
  },
  error: (errMessage, code = 400) => {
    return {
      httpCode: code,
      code,
      error: true,
      message: JSON.stringify(errMessage),
      data: null,
    };
  },
  success: (data, message = "success", code = 200) => {
    return {
      httpCode: 200,
      code,
      error: false,
      message,
      data,
    };
  },
};
