const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrdenVenta = sequelize.define('OrdenVenta', {
  CodVenta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fechaVenta: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  totalVenta: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  }
});

module.exports = OrdenVenta;
