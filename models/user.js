const { DataTypes } = require("sequelize")
const sequelize = require("../middlewares/database")

const User = sequelize.define(
    "User",
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        createdAt: false,
        updatedAt: false
    }
)

module.exports = User