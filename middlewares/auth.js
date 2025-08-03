const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret_key';

module.exports = function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Missing Authorization header' });

  const token = authHeader.split(' ')[1]; // Bearer TOKEN
  if (!token) {
    return res.status(403).json({ message: 'Forbidden, invalid token' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // เก็บข้อมูล user ใน req.user เผื่อใช้ต่อ
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Forbidden, invalid token' });
  }
};
