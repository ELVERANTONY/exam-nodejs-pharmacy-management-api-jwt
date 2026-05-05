const express = require('express');
const router = express.Router();
const medicamentoController = require('../controllers/medicamentoController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

// All authenticated users can list medicines
router.get('/', authenticateToken, medicamentoController.getAll);
router.get('/:id', authenticateToken, medicamentoController.getById);

// Only ADMIN can create, update, or delete medicines
router.post('/', authenticateToken, authorizeRoles('ADMIN'), medicamentoController.create);
router.put('/:id', authenticateToken, authorizeRoles('ADMIN'), medicamentoController.update);
router.delete('/:id', authenticateToken, authorizeRoles('ADMIN'), medicamentoController.delete);

module.exports = router;
