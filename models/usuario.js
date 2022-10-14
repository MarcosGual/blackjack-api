const Jugada = require("./jugada");

module.exports = (sequelize, DataTypes)=> {
    const Usuario = sequelize.define('Usuario', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        usuario: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        password: {
            type: DataTypes.STRING,
            allowNull: false
        } 
    }, {
        freezeTableName: true,
    });

   
    return Usuario;
}