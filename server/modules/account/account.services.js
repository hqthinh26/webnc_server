const db = require("../../db");
const _ = require("lodash");

exports.isAccountNameTaken = (account_name, is_deleted = false) => {
  return db("account").where({ account_name, is_deleted }).first();
};

exports.createAccount = (body) => {
  const newAccount = _.pick(body, [
    "account_name",
    "pw",
    "full_name",
    "email",
    "age",
  ]);
  newAccount.role_id = 1;
  return db("account").insert(newAccount).returning('id');
};
