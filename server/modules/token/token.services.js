const db = require("../../db");
const moment = require("moment");

exports.create = (newAccessToken) => {
  return db("token").insert(newAccessToken);
};

/**
 * 
 * @param {*} token
 * @param {*.token}
 * @param {*.expired_at}
 * @param {*.logout_at} 
 */
exports.verifyToken = (token) => {
  return db("token")
  .select("*")
  .where("token", token)
  .whereNull("logout_at")
  .first();
}

exports.delete = (token) => {
  console.log({logout_at: moment().add(7,'h'), type: typeof moment().add(7,'h')})
  console.log({logout_at: moment().add(7,'h').format(), type: typeof moment().add(7,'h').format()})
  return db("token")
    .update({
      "logout_at": moment().add(7, "h").format(),
    })
    .where("token", token)
};

exports.list = () => {
  return db("token");
};
