const db = require("../../db");

exports.getDetailByCourseID = (query) => {
  return db("course_detail")
    .select(
      "account.full_name as lecturer_full_name",
      "course_detail.*",
      "course.name as course_name",
      "course.price as course_price",
      "course.rating as course_rating",
      "course.rating_count as course_rating_count",
      "course.is_best_seller as course_is_best_seller",
    )
    .innerJoin("account", "account.id", "course_detail.lecturer_id")
    .innerJoin("course", "course.id", "course_detail.course_id")
    .where({
      "course_detail.course_id": query.course_id,
      "course_detail.is_deleted": false,
    });
};

exports.create = (courseDetail) => {
  return db("course_detail").insert(courseDetail).returning("id");
}
