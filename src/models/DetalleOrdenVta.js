const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DetalleOrdenVta = sequelize.define('DetalleOrdenVta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  precioUni: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
});

module.exports = DetalleOrdenVta;
