const db = require('../../db');

exports.create = (newRefreshToken) => {
    return db("refresh_token").insert(newRefreshToken).returning('id');
}