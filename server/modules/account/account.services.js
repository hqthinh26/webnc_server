const db = require("../../db");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const { forbidden } = require("joi");

exports.isAccountNameTaken = (account_name, is_deleted = false) => {
  return db("account").where({ account_name, is_deleted }).first();
};

exports.accountDetail = (account_id) => {
  return db("account as a")
    .select("a.id", "a.account_name", "a.full_name", "a.email", "a.age", "a.role_id", "a.profile_image as profile_image","r.name as role_name")
    .innerJoin("role as r", "r.id", "a.role_id")
    .where({ "a.id": account_id })
    .first();
};

exports.updateAccount = (id, body) => {
  const updatedInfo = _.pick(body, ["full_name", "email", "age"]);
  return db("account").update(updatedInfo).where("id", id);
}


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

    return db("account").insert(newAccount).returning("id");
  } catch (e) {
    return e;
  }
};
