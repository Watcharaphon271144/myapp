// app.js
require('dotenv').config();

const express = require('express');
const app = express();

const sequelize = require('./middlewares/database');
const shopRoutes = require('./routes/shops');
const loginRoute = require('./routes/auth'); // 👈 เปลี่ยนชื่อเพื่อความชัดเจน
const userRoutes = require('./routes/users');

app.use(express.json());

// 📌 Register routes
app.use('/api', shopRoutes);               
app.use('/login', loginRoute);            
app.use('/api/users', userRoutes);        

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
