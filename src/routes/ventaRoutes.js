const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

// ADMIN and VENDEDOR can handle sales
router.post('/', authenticateToken, authorizeRoles('ADMIN', 'VENDEDOR'), ventaController.createVenta);
router.get('/', authenticateToken, authorizeRoles('ADMIN', 'VENDEDOR'), ventaController.getAllVentas);

module.exports = router;
