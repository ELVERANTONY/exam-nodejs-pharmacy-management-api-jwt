const { OrdenCompra, DetalleOrdenCompra, Medicamento } = require('../models');
const sequelize = require('../config/database');

exports.createCompra = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { CodLab, detalles } = req.body; // { CodLab, detalles: [{ CodMedicamento, cantidad, precioCostoUni }] }
    
    let total = 0;
    const compra = await OrdenCompra.create({ CodLab }, { transaction: t });

    for (const item of detalles) {
      const med = await Medicamento.findByPk(item.CodMedicamento, { transaction: t });
      
      if (!med) {
        throw new Error(`Medicamento con ID ${item.CodMedicamento} no encontrado`);
      }

      // Aumentar stock
      med.stock += item.cantidad;
      await med.save({ transaction: t });

      // Crear detalle
      await DetalleOrdenCompra.create({
        CodCompra: compra.CodCompra,
        CodMedicamento: item.CodMedicamento,
        cantidad: item.cantidad,
        precioCostoUni: item.precioCostoUni
      }, { transaction: t });

      total += item.precioCostoUni * item.cantidad;
    }

    compra.totalCompra = total;
    await compra.save({ transaction: t });

    await t.commit();
    res.status(201).json({ message: 'Compra registrada con éxito', compraId: compra.CodCompra, total });
  } catch (error) {
    await t.rollback();
    res.status(400).json({ message: 'Error al registrar compra', error: error.message });
  }
};

exports.getAllCompras = async (req, res) => {
  try {
    const compras = await OrdenCompra.findAll({
      include: [{ model: DetalleOrdenCompra, as: 'detalles' }]
    });
    res.json(compras);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener compras', error: error.message });
  }
};
