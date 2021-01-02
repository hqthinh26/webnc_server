const db = require("../db");

exports.isTokenValid = (token) => {
    return db("token").where({token}).first();
}