const dotenv = require('dotenv').config()
module.exports = {
    HOST: process.env.HOST,
    USER:process.env.USUARIO,
    PASSWORD:process.env.PASSWORD,
    DATABASE:process.env.DATABASE,
    DIALECTO:'mysql'
}