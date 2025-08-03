const express = require('express');
const app = express();
const sequelize = require('./middlewares/database');
const shopRoutes = require('./routes/shops');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users'); // ✅ เพิ่มตรงนี้

app.use(express.json());

app.use('/api', shopRoutes);
app.use('/auth', authRoutes);
app.use('/api/users', userRoutes); // ✅ เพิ่มตรงนี้

const PORT = process.env.PORT || 3004;

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Database sync error:', err));

module.exports = app;  // <== เพิ่มตรงนี้
