const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE_URL, // ✅ ใช้ค่าจาก environment variable
  {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // 👈 สำคัญมาก! ไม่ใส่จะ error
      }
    }
  }
);

module.exports = sequelize;
