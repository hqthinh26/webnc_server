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
      httpCode: 400,
      code: code,
      error: true,
      message: JSON.stringify(errMessage),
      data: null,
    };
  },
  success: (data, message = "success") => {
    return {
      httpCode: 200,
      code: 200,
      error: false,
      message,
      data: data,
    };
  },
};
