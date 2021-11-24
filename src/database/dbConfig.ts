import  knex  from "knex";
const configOptions = require("../../knexfile");
let dbConfigOption;
if (process.env.NODE_ENV === "test") {
  dbConfigOption = configOptions.test
} else {
  dbConfigOption = configOptions.development
}

module.exports = knex(dbConfigOption);
