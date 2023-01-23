import knex from "knex";
const connection = require("knex")({
  client: "mysql2",
  connection: {
    // host: "localhost",
    // port: 3306,
    // user: "root",
    // password: "ntng",
    // database: "drug_box",
    host: "127.0.0.1",
    port: 3306,
    user: "aran30",
    password: "aranFvg8zjkowfh",
    database: "drug_box",
  },
  pool: {
    min: 0,
    max: 7,
    afterCreate: (conn: any, done: any) => {
      conn.query("SET NAMES utf8mb4", (err: any) => {
        done(err, conn);
      });
    },
  },
});

export default connection;
