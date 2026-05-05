const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TipoMedicamento = sequelize.define('TipoMedicamento', {
  CodTipoMed: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombreTipo: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = TipoMedicamento;
