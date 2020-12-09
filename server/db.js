const knex = require("knex")({
  client: "pg",
  connection: {
    host: "db_final",
    user: "webnangcao",
    password: "abcdef1234",
    database: "hqt_webnc",
  },
});

module.exports = knex;