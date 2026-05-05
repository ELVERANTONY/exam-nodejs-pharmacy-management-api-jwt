const { Sequelize } = require('sequelize');
require('dotenv').config();

// En la nube (Render/Railway) se suele usar DATABASE_URL
// En local usamos las variables individuales
const isProduction = process.env.NODE_ENV === 'production';

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      protocol: 'postgres',
      dialectOptions: {
        ssl: isProduction ? {
          require: true,
          rejectUnauthorized: false
        } : false
      },
      logging: false
    })
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        logging: false,
        define: {
          timestamps: true,
          freezeTableName: true
        }
      }
    );

module.exports = sequelize;
