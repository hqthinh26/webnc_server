const db = require("../../db");

exports.getAccountPermissions = (account_id) => {
    return db('account')
    .select("permission.*")
    .innerJoin("role_permission", "role_permission.role_id", "account.role_id")
    .innerJoin("permission", "permission.id", "role_permission.permission_id")
    .where({"account.id": account_id});
}