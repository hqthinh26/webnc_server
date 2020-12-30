const responseHanler = require("../../response_handler");
const services = require("./course_type.services");

exports.getList = async (req, res, next) => {
  try {
    const list = await services.getList();
    next(responseHanler.success(list));
  } catch (e) {
    next(e);
  }
};
