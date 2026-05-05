const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { body, validationResult } = require('express-validator');

const validateRegister = [
  body('username').notEmpty().withMessage('Username es requerido'),
  body('password').isLength({ min: 6 }).withMessage('Password debe tener al menos 6 caracteres'),
  body('rol').isIn(['ADMIN', 'VENDEDOR', 'ALMACEN']).withMessage('Rol no válido'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

router.post('/register', validateRegister, authController.register);
router.post('/login', authController.login);

module.exports = router;
