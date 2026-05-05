const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Laboratorio = sequelize.define('Laboratorio', {
  CodLab: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombreLab: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ruc: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Laboratorio;
