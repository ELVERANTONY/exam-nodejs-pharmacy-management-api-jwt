const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compraController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

// ADMIN and ALMACEN can handle purchases
router.post('/', authenticateToken, authorizeRoles('ADMIN', 'ALMACEN'), compraController.createCompra);
router.get('/', authenticateToken, authorizeRoles('ADMIN', 'ALMACEN'), compraController.getAllCompras);

module.exports = router;
