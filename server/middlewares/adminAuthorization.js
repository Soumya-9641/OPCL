const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin'); // Assuming you have an Admin model

async function isAdmin(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key');

    // Check if the user is an admin
    const admin = await Admin.findById(decoded.userId);

    if (!admin) {
      return res.status(403).json({ message: 'Admin access denied' });
    }

    // Attach the admin's ID to the request object for future use
    req.adminId = admin._id;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
}

module.exports = isAdmin;