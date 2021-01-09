const db = require("../../db");
const _ = require("lodash");

exports.findCoursesByText = (text = '') => {
  console.log("====================");
  console.log("this is text", text);
  return db("course")
    .select("name")
    .whereRaw("to_tsvector(name) @@ to_tsquery(?)", [text]);
};
