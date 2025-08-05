const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// ตัวอย่างข้อมูล user จริงควรเก็บใน DB
const users = [
  {
    id: 1,
    username: 'admin',
    // รหัสผ่าน hashed จาก '123456'
    passwordHash: bcrypt.hashSync('123456', 8),
  },
];

// คีย์ลับสำหรับเซ็น JWT (ควรเก็บใน .env)
const JWT_SECRET = 'your_jwt_secret_key';

// POST /login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const passwordIsValid = bcrypt.compareSync(password, user.passwordHash);
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // สร้าง token
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({ token });
});

module.exports = router;
