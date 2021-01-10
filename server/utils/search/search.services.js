const db = require("../../db");
const _ = require("lodash");

exports.findCoursesByText = (text = '') => {
  return db("course")
  .select("course.*", "course_type.name as course_type_name", "account.full_name as lecturer_full_name", "course_detail.bio as course_bio")
  .innerJoin("course_type", "course_type.id", "course.course_type_id")
  .innerJoin("account", "account.id", "course.lecturer_id")
  .leftJoin("course_detail", "course_detail.course_id", "course.id")
    .whereRaw("to_tsvector(course.name) @@ to_tsquery(?)", [text]);
};
