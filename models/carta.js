module.exports = (sequelize, DataTypes)=> {
    const Carta = sequelize.define('Carta', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        valor: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        valorJuego: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        palo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        img: {
            type: DataTypes.BLOB('long'),
            allowNull: true
        },

    }, {
        freezeTableName: true
    });

    return Carta;
}