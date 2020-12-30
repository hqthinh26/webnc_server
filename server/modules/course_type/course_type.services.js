const db = require("../../db");

exports.getList = () => {
    return db("course_type");
}