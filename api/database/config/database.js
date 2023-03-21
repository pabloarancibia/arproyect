require('dotenv').config()

module.exports = {
  //configuracion db
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,

  // Seeds
  seederStorage: "sequelize",
  seederStorageTableName: "seeds",

  // Migraciones
  migrationStorage: "sequelize",
  migrationStorageTableName: "migrations",

  // singular tables in db
  define: {
    //prevent sequelize from pluralizing table names
    freezeTableName: true
  },

  development: {
    //configuracion db
    username: 'adminAR',
    password: '4r4nc1b14&t4ll3r&SeT&DB',
    database: 'AR_registros',
    host: process.env.DB_HOST,
    port: 3307,
    dialect: 'mysql',
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  }
}
