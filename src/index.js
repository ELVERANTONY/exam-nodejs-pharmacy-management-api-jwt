const app = require('./app');
const sequelize = require('./config/database');
require('./models'); // Load associations

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Sincronizar modelos con la base de datos
    // force: false para no borrar datos existentes, true para recrear tablas
    await sequelize.sync({ alter: true });
    console.log('Conexión a la base de datos establecida y modelos sincronizados.');

    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
}

startServer();
