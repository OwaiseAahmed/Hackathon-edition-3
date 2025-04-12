const restrictTo = (...allowedRoles) => {
    return (req, res, next) => {
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Not authorized for this action' });
      }
      next();
    };
  };
  
  module.exports = { restrictTo };
  