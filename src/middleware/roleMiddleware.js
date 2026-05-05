const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.rol)) {
      return res.status(403).json({ 
        message: `Acceso prohibido. Se requiere rol: ${roles.join(' o ')}` 
      });
    }
    next();
  };
};

module.exports = authorizeRoles;
