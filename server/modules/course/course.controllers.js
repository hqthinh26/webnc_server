const responseHandler = require("../../response_handler");
const services = require("./course.services");
const courseServices = require("../course/course.services");
const courseDetailServices = require("../course_detail/course_detail.services");

const Joi = require("joi");
const _ = require("lodash");

exports.getList = async (req, res, next) => {
  try {
    const list = await services.getList(req.query);
    next(responseHandler.success(list));
  } catch (e) {
    next(e);
  }
};

exports.create = async (req, res, next) => {
  try {
    console.log(0);
    const schema = Joi.object({
      name: Joi.string().required(),
      bio: Joi.string().required(),
      full_description: Joi.string().required(),
      will_learn_list: Joi.string().required(),
      course_type_id: Joi.number().required(),
      price: Joi.number().required(),
      clickbait_image: Joi.string().required(),
    }).validate(req.body);

    if (schema.error)
      return next(responseHandler.validationError(schema.error));

    const { id, role_id } = req.decoded;
    console.log("2 - role_id", role_id);
    if (role_id === 1)
      return next(
        responseHandler.error(
          "Tài khoản không phải giảng viên hoặc quản trị viên"
        )
      );
    console.log(2);
    const courseData = _.pick(schema.value, [
      "name",
      "course_type_id",
      "clickbait_image",
      "price",
    ]);
    courseData.lecturer_id = id;
    console.log("this is course data", courseData);
    //Add to course table
    const course = await courseServices.create(courseData);
    console.log('3 : this is course return', course);
    const courseDetailData = _.pick(schema.value, [
      "bio",
      "full_description",
      "will_learn_list",
    ]);
    courseDetailData.course_id = course[0];
    //Add to course detail table
    const result_detail = await courseDetailServices.create(courseDetailData);
    console.log(4);
    next(responseHandler.success({ course, result_detail }));
  } catch (e) {
    next(e);
  }
};
