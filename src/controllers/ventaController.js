const { OrdenVenta, DetalleOrdenVta, Medicamento } = require('../models');
const sequelize = require('../config/database');

exports.createVenta = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { detalles } = req.body; // Array of { CodMedicamento, cantidad, precioUni }
    
    let total = 0;
    const venta = await OrdenVenta.create({}, { transaction: t });

    for (const item of detalles) {
      const med = await Medicamento.findByPk(item.CodMedicamento, { transaction: t });
      
      if (!med) {
        throw new Error(`Medicamento con ID ${item.CodMedicamento} no encontrado`);
      }

      if (med.stock < item.cantidad) {
        throw new Error(`Stock insuficiente para ${med.descripcionMed}. Disponible: ${med.stock}`);
      }

      // Restar stock
      med.stock -= item.cantidad;
      await med.save({ transaction: t });

      // Crear detalle
      await DetalleOrdenVta.create({
        CodVenta: venta.CodVenta,
        CodMedicamento: item.CodMedicamento,
        cantidad: item.cantidad,
        precioUni: item.precioUni || med.precioVentaUni
      }, { transaction: t });

      total += (item.precioUni || med.precioVentaUni) * item.cantidad;
    }

    venta.totalVenta = total;
    await venta.save({ transaction: t });

    await t.commit();
    res.status(201).json({ message: 'Venta registrada con éxito', ventaId: venta.CodVenta, total });
  } catch (error) {
    await t.rollback();
    res.status(400).json({ message: 'Error al registrar venta', error: error.message });
  }
};

exports.getAllVentas = async (req, res) => {
  try {
    const ventas = await OrdenVenta.findAll({
      include: [{ model: DetalleOrdenVta, as: 'detalles' }]
    });
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener ventas', error: error.message });
  }
};
