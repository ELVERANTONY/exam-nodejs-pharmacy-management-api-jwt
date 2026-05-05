const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Medicamento = sequelize.define('Medicamento', {
  CodMedicamento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descripcionMed: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fechaFabricacion: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  fechaVencimiento: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  presentacion: {
    type: DataTypes.STRING,
    allowNull: true
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  precioVentaUni: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  precioVentaPres: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  Marca: {
    type: DataTypes.STRING,
    allowNull: true
  },
  CodTipoMed: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  CodEspec: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
});

module.exports = Medicamento;
