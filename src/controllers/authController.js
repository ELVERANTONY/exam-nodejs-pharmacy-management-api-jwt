const { Usuario } = require('../models');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, password, rol } = req.body;
    
    const existingUser = await Usuario.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe.' });
    }

    const newUser = await Usuario.create({ username, password, rol });
    res.status(201).json({ 
      message: 'Usuario registrado exitosamente',
      user: { id: newUser.id, username: newUser.username, rol: newUser.rol }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Usuario.findOne({ where: { username } });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ token, user: { username: user.username, rol: user.rol } });
  } catch (error) {
    res.status(500).json({ message: 'Error en el login', error: error.message });
  }
};
