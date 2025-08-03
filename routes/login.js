let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');
const User = require('../models/user')

const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/', async function (req, res, next) {
    try {
        let body = req.body
        if (!body.username || !body.password) {
            throw new Error("username and password is required.!")
        }

        let userNameIsValid = false
        let passWordIsValid = false

        const userData = await User.findOne({
            where: {
                username: body.username
            },
            raw: true
        })
        if (userData !== null) {
            userNameIsValid = true
            if (userData.password) {
                passWordIsValid = await bcrypt.compare(body.password, userData.password)
            }
        }
        if (!userNameIsValid || !passWordIsValid) {
            throw new Error("username or password invalid.!")
        }
        let token = jwt.sign({ username: body.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({
            message: "Login Success.",
            token: token
        })
    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }
});

module.exports = router;