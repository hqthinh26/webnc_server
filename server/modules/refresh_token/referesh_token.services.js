const db = require('../../db');

exports.create = (newAccessToken) => {
    return db("token").insert(newAccessToken).returning('id');
}

exports.delete = (tokenString) => {
    return db("token").where({token: tokenString}).del();
}