// Update with your config settings.

import dotenv from "dotenv";
dotenv.config()

module.exports = {

  development: {
    client: "postgresql",
    connection: {
      connectionString: process.env.dev_database_url,
      user: process.env.db_username,
      password: process.env.db_password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './src/database/migrations'

    }, 
    seeds: {
      directory: "./src/database/seeds"
    },
    useNullAsDefault: true,
  },

  test: {
    client: "postgresql",
    connection: {
      connectionString: process.env.test_database,
      user: process.env.db_username,
      password: process.env.db_password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './src/database/migrations'

    }, 
    seeds: {
      directory: "./src/database/seeds"
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
