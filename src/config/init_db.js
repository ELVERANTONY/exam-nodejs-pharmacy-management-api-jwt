const { Client } = require('pg');
require('dotenv').config();

async function createDatabase() {
  // Conectarse a la base de datos 'postgres' por defecto para crear la nueva
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'postgres'
  });

  try {
    await client.connect();
    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${process.env.DB_NAME}'`);
    
    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE "${process.env.DB_NAME}"`);
      console.log(`Base de datos '${process.env.DB_NAME}' creada con éxito.`);
    } else {
      console.log(`Base de datos '${process.env.DB_NAME}' ya existe.`);
    }
  } catch (error) {
    console.error('Error al verificar/crear la base de datos:', error.message);
  } finally {
    await client.end();
  }
}

createDatabase();
