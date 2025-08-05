// app.js
require('dotenv').config(); // ✅ โหลดตัวแปรจาก .env

const express = require('express');
const app = express();

const sequelize = require('./middlewares/database');
const shopRoutes = require('./routes/shops');
const loginRoute = require('./routes/auth');
const userRoutes = require('./routes/users');

// Middleware
app.use(express.json());

// Routes
app.use('/shops', shopRoutes);       // ✅ ไม่ต้องใช้ /api ก็ได้
app.use('/login', loginRoute);       // ✅ ไม่ควรใช้ authMiddleware ที่นี่
app.use('/users', userRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to MyApp API');
});

// Export express app + sequelize ให้ `bin/www` ใช้
module.exports = { app, sequelize };
