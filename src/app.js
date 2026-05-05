const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const medicamentoRoutes = require('./routes/medicamentoRoutes');
const ventaRoutes = require('./routes/ventaRoutes');
const compraRoutes = require('./routes/compraRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/medicamentos', medicamentoRoutes);
app.use('/api/ventas', ventaRoutes);
app.use('/api/compras', compraRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo salió mal!', error: err.message });
});

module.exports = app;
