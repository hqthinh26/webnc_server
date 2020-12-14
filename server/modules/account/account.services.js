const db = require("../../db");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

exports.isAccountNameTaken = (account_name, is_deleted = false) => {
  return db("account").where({ account_name, is_deleted }).first();
};


exports.createAccount = async (body) => {
  const newAccount = _.pick(body, [
    "account_name",
    "pw",
    "full_name",
    "email",
    "age",
  ]);
  newAccount.role_id = 1;
  try {
    const salt = await bcrypt.genSalt(10);
    const hasedPw = await bcrypt.hash(newAccount.pw, salt);
    newAccount.pw = hasedPw;

    return db("account").insert(newAccount).returning('id');
  } catch(e) {
    return e;
  }
};
