const { Medicamento, TipoMedicamento, Especialidad } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const medicamentos = await Medicamento.findAll({
      include: [TipoMedicamento, Especialidad]
    });
    res.json(medicamentos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener medicamentos', error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const medicamento = await Medicamento.findByPk(req.params.id, {
      include: [TipoMedicamento, Especialidad]
    });
    if (!medicamento) return res.status(404).json({ message: 'Medicamento no encontrado' });
    res.json(medicamento);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener medicamento', error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const nuevoMedicamento = await Medicamento.create(req.body);
    res.status(201).json(nuevoMedicamento);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear medicamento', error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const [updated] = await Medicamento.update(req.body, {
      where: { CodMedicamento: req.params.id }
    });
    if (updated) {
      const updatedMed = await Medicamento.findByPk(req.params.id);
      return res.json(updatedMed);
    }
    throw new Error('Medicamento no encontrado');
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar medicamento', error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await Medicamento.destroy({
      where: { CodMedicamento: req.params.id }
    });
    if (deleted) return res.json({ message: 'Medicamento eliminado' });
    throw new Error('Medicamento no encontrado');
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar medicamento', error: error.message });
  }
};
