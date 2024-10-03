const { config } = require('dotenv');
const pg = require("pg");
config();

module.exports = {
    dialect: process.env.DB_DIALECT,
    dialectModule: pg,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: true,
            require: true
        }
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000 // idle timeout in milliseconds
    }
}