import  knex  from "knex";
const configOptions = require("../../knexfile");
const option = configOptions.development
module.exports = knex(option);
