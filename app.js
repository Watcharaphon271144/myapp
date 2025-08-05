// routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const users = [
  { id: 1, username: 'admin', password: bcrypt.hashSync('123456', 8) }
];

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) return res.status(401).json({ message: 'Invalid password' });

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '1h' }
  );

  res.json({ message: 'Login successful', token });
});

module.exports = router;
