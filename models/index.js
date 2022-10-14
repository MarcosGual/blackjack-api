const dbConfig = require ('../config/configBD.js');
const Sequelize = require ('sequelize'); 

const sequelize = new Sequelize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD,{
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECTO
});

const db = {};
db.sequelize = sequelize;
db.models = {};
db.models.Jugada = require('./jugada')(sequelize, Sequelize.DataTypes);
db.models.Usuario = require('./usuario')(sequelize, Sequelize.DataTypes);
db.models.Carta = require('./carta')(sequelize, Sequelize.DataTypes);
db.models.Usuario.hasMany(db.models.Jugada);


module.exports = db;
