const db = require("../../db");

/**
 *
 * @param {*} query
 * @param {*.course_id} required
 */
exports.getFeedBackByCourseID = (query) => {
  return db("feedback")
    .select(
      "feedback.*",
      "account.account_name as commentor_name",
      "account.profile_image as commentor_profile_image",
      "course.name as course_name"
    )
    .innerJoin("course", "course.id", "feedback.course_id")
    .innerJoin("account", "account.id", "feedback.account_id")
    .where({
      "feedback.course_id": query.course_id,
      "feedback.is_deleted": false,
    });
};
