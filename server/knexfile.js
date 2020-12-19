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
    pools: {
      afterCreate: function (conn, done) {
        conn.query('SET timezone="Asia/Ho_Chi_Minh;"', function (err) {
          if (err) {
            console.log("after create error", JSON.stringify(err));
          } else {
            conn.query("SELECT set_limit(0.01);", function (err) {
              done(err, conn);
            });
          }
        });
      },
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};
