const Usuario = require('./Usuario');
const Laboratorio = require('./Laboratorio');
const Medicamento = require('./Medicamento');
const TipoMedicamento = require('./TipoMedicamento');
const Especialidad = require('./Especialidad');
const OrdenVenta = require('./OrdenVenta');
const DetalleOrdenVta = require('./DetalleOrdenVta');
const OrdenCompra = require('./OrdenCompra');
const DetalleOrdenCompra = require('./DetalleOrdenCompra');

// Associations
TipoMedicamento.hasMany(Medicamento, { foreignKey: 'CodTipoMed' });
Medicamento.belongsTo(TipoMedicamento, { foreignKey: 'CodTipoMed' });

Especialidad.hasMany(Medicamento, { foreignKey: 'CodEspec' });
Medicamento.belongsTo(Especialidad, { foreignKey: 'CodEspec' });

// Sales
OrdenVenta.hasMany(DetalleOrdenVta, { foreignKey: 'CodVenta', as: 'detalles' });
DetalleOrdenVta.belongsTo(OrdenVenta, { foreignKey: 'CodVenta' });

Medicamento.hasMany(DetalleOrdenVta, { foreignKey: 'CodMedicamento' });
DetalleOrdenVta.belongsTo(Medicamento, { foreignKey: 'CodMedicamento' });

// Purchases
Laboratorio.hasMany(OrdenCompra, { foreignKey: 'CodLab' });
OrdenCompra.belongsTo(Laboratorio, { foreignKey: 'CodLab' });

OrdenCompra.hasMany(DetalleOrdenCompra, { foreignKey: 'CodCompra', as: 'detalles' });
DetalleOrdenCompra.belongsTo(OrdenCompra, { foreignKey: 'CodCompra' });

Medicamento.hasMany(DetalleOrdenCompra, { foreignKey: 'CodMedicamento' });
DetalleOrdenCompra.belongsTo(Medicamento, { foreignKey: 'CodMedicamento' });

module.exports = {
  Usuario,
  Laboratorio,
  Medicamento,
  TipoMedicamento,
  Especialidad,
  OrdenVenta,
  DetalleOrdenVta,
  OrdenCompra,
  DetalleOrdenCompra
};
