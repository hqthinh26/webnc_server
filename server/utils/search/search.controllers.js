const services = require("./search.services");
const Joi = require("joi");
const populateResponse = require("../../response_handler");

exports.find = async (req, res, next) => {
  try {
    const schema = Joi.object({
      text: Joi.string().optional().allow(""),
    }).validate(req.query);

    if (schema.error)
      return next(populateResponse.validationError(schema.error));

    const foundCourses = await services.findCoursesByText(schema.value.text);

    next(populateResponse.success(foundCourses));
  } catch (e) {
      next(e);
  }
};
