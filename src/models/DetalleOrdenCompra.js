const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DetalleOrdenCompra = sequelize.define('DetalleOrdenCompra', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  precioCostoUni: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
});

module.exports = DetalleOrdenCompra;
