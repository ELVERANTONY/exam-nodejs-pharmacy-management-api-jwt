const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrdenCompra = sequelize.define('OrdenCompra', {
  CodCompra: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fechaCompra: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  totalCompra: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  }
});

module.exports = OrdenCompra;
