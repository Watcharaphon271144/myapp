const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const HARDCODED_USERNAME = 'admin';
const HARDCODED_PASSWORD = '123456';

router.post('/', (req, res) => {
  const { username, password } = req.body;
  if (username === HARDCODED_USERNAME && password === HARDCODED_PASSWORD) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({
      message: 'Login success',
      token,
    });
  } else {
    res.status(401).json({
      message: 'Invalid username or password',
    });
  }
});

module.exports = router;
