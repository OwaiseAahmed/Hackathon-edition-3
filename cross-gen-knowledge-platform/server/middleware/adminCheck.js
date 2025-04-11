export const adminCheck = (req, res, next) => {
    const ADMIN_EMAIL = "admin@example.com";
  
    if (!req.user || req.user.email !== ADMIN_EMAIL) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
  
    next();
  };
  