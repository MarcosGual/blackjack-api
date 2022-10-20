const usuario = require("./usuario");

module.exports = (sequelize, DataTypes) => {
  const Jugada = sequelize.define(
    "Jugada",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      puntajeCroupier: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      puntajeUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cartasCroupier: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      cartasUsuario: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      mazo:{
        type: DataTypes.JSON,
        allowNull: false
      },
      gano: {
        type: DataTypes.BOOLEAN,
      },
      terminada: {
        type: DataTypes.BOOLEAN,
      },
      blackjack:{
        type: DataTypes.BOOLEAN
      }
    },
    {
      freezeTableName: true,
    }
  );

  return Jugada;
};
