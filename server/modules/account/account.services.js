const db = require('../../db');

exports.addNewAccount = function (account) {
    return db("account").insert(account);
};