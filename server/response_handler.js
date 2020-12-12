module.exports = {
  validationError: (err) => {
    return {
      httpCode: 400,
      error: true,
      message: err.details,
      data: null,
    };
  },
  error: (err) => {
    return {
      httpCode: 400,
      error: true,
      message: JSON.stringify(err),
      data: null,
    };
  },
  success: (data, message = "success") => {
    return {
      httpCode: 200,
      error: false,
      message,
      data: data,
    };
  },
};
