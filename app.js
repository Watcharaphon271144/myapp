require('dotenv').config();

const express = require('express');
const app = express();

const sequelize = require('./middlewares/database');
const shopRoutes = require('./routes/shops');
const loginRoute = require('./routes/auth'); // 👈 เปลี่ยนชื่อเพื่อความชัดเจน
const userRoutes = require('./routes/users');

app.use(express.json());

// 📌 Register routes
app.use('/shops', shopRoutes);        // เปลี่ยนจาก '/api' เป็น '/shops' เพื่อให้ใช้ URL ตรง /shops
app.use('/login', loginRoute);
app.use('/users', userRoutes);         // เปลี่ยนจาก '/api/users' เป็น '/users' ถ้าอยากให้ path ไม่มี /api

// Optional: default route
app.get('/', (req, res) => {
  res.send('Welcome to MyApp API');
});

const PORT = process.env.PORT || 3004;

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.error('Database sync error:', err));

module.exports = app;
