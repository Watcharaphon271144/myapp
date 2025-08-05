// routes/auth.js
require('dotenv').config(); // โหลด .env
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// ตัวอย่างข้อมูล user (ในโปรดักชันควรใช้ DB)
const users = [
  {
    id: 1,
    username: 'admin',
    passwordHash: bcrypt.hashSync('123456', 8), // hash ของ '123456'
  },
];

// ใช้ JWT_SECRET จาก .env
const JWT_SECRET = process.env.JWT_SECRET;

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

  // สร้าง JWT token
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
