const responseHandler = require("../../response_handler");
const Joi = require("joi");
const services = require("./course_detail.services");
const moment = require("moment");

exports.getCourseDetailByID = async (req, res, next) => {
  try {
    const schema = Joi.object({
      course_id: Joi.number().required(),
    }).validate(req.query);
    if (schema.error)
      return next(responseHandler.validationError(schema.error));

    const detail = await services.getDetailByCourseID(schema.value);
    if (detail.length === 0)
      return next(responseHandler.success(detail, "Không có account detail"));
    detail[0].full_description = detail[0].full_description.split("-");
    detail[0].vn_updated_at = moment(detail[0].updated_at).format("DD-MM-YYYY");

    return next(responseHandler.success(detail));
  } catch (e) {
    next(e);
  }
};
