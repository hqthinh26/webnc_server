const db = require("../../db");

exports.create = (newAccessToken) => {
  return db("token").insert(newAccessToken);
};

exports.delete = (token) => {
  return db("token").where({ token }).del();
};
