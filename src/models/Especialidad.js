const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Especialidad = sequelize.define('Especialidad', {
  CodEspec: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombreEspec: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Especialidad;
