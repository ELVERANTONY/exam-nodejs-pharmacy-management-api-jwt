const { TipoMedicamento, Especialidad, Laboratorio } = require('./src/models');
const sequelize = require('./src/config/database');

async function seedData() {
  try {
    await sequelize.sync();
    
    // Crear TipoMedicamento con ID 1
    await TipoMedicamento.findOrCreate({
      where: { CodTipoMed: 1 },
      defaults: { nombreTipo: 'Genéricos' }
    });

    // Crear Especialidad con ID 1
    await Especialidad.findOrCreate({
      where: { CodEspec: 1 },
      defaults: { nombreEspec: 'Medicina General' }
    });

    // Crear Laboratorio con ID 1 (Para tus futuras compras)
    await Laboratorio.findOrCreate({
      where: { CodLab: 1 },
      defaults: { nombreLab: 'Laboratorio Genfar', ruc: '20123456789' }
    });

    console.log('Datos maestros (ID: 1) creados con éxito.');
    process.exit(0);
  } catch (error) {
    console.error('Error al crear datos maestros:', error.message);
    process.exit(1);
  }
}

seedData();
