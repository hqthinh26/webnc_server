const db = require("../../db");

exports.getList = (query = {}) => {
    return db("course as c")
    .select(
        "c.*",
        "ct.name as course_type_name",
        "a.full_name as lecturer_full_name"
    )
    .innerJoin("course_type as ct", "ct.id", "c.course_type_id")
    .innerJoin("account as a", "a.id", "c.lecturer_id")
    .modify(builder => {
        if (query.course_type_id) {
            builder.andWhere({course_type_id: query.course_type_id});
        }
    });
}