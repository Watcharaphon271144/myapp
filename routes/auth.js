// routes/auth.js
require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// ผู้ใช้ mock
const users = [
  {
    id: 1,
    username: 'admin',
    passwordHash: bcrypt.hashSync('123456', 8),
  },
];

// อ่าน JWT_SECRET จาก .env หรือ fallback (กันลืม)
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

if (!process.env.JWT_SECRET) {
  console.warn('⚠️ Warning: JWT_SECRET is not defined in environment variables. Using fallback_secret.');
}

// POST /login
router.post('/', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const passwordIsValid = bcrypt.compareSync(password, user.passwordHash);
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.status(200).json({
    message: 'Login success',
    token,
  });
});

module.exports = router;
