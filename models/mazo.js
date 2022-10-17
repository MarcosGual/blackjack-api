module.exports = (sequelize, DataTypes) => {
  const Mazo = sequelize.define(
    "Mazo",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      cartasDisponibles: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      cartasRetiradas: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );

  return Mazo;
};
