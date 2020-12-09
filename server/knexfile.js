const { modules } = require("./db");

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "db_final",
      user: "webnangcao",
      password: "abcdef1234",
      database: "hqt_webnc",
    },
    migrations: {
        directory: './migrations',
    },
    seeds: {
        directory: './seeds',
    }
  },
};
