var express = require('express');
var router = express.Router();
const User = require('../models/user')
const bcrypt = require("bcrypt")

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const username = req.query.username
  let condition = username ? { where: { username } } : {}
  let usersData = await User.findAll(condition)
  res.status(200).json({
    success: true,
    data: usersData
  })
});

router.post('/', async function (req, res) {
  try {
    const body = req.body
    if (!body.username || !body.password) {
      throw new Error("username or password is required.!")
    }
    if (body.password !== body.confirmPassword) {
      throw new Error("password and confirmPassword not matching.!")
    }
    let hashPassword = await bcrypt.hash(body.password, 10)
    let result = await User.create({
      username: body.username,
      password: hashPassword,
      fullname: body.fullname || ""
    })
    res.status(200).json({
      success: true,
      message: "User created.",
      data: result
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
})

router.put('/:id', async function (req, res) {
  try {
    const body = req.body
    const id = req.params.id
    const user = await User.findOne({
      where: {
        id: id
      },
      raw: true
    })
    if(!user) {
      throw new Error("User not found.")
    }

    let data = user
    if (body.password) {
      if(body.currentPassword) {
        let currentPasswordIsValid = await bcrypt.compare(body.currentPassword, data.password)
        if(!currentPasswordIsValid) {
          throw new Error("currentPassword not matching.")
        }
      } else {
        throw new Error("currentPassword is required.!")
      }

      if (body.password == body.confirmPassword) {
        data.password = await bcrypt.hash(body.password, 10)
      } else {
        throw new Error("password and confirmPassword not matching.")
      }
    }
    if(body.fullname) {
      data.fullname = body.fullname
    }

    let result = await User.update(data, {
      where: {
        id: id
      }
    })
    res.status(200).json({
      success: true,
      message: "User Updated.",
      data: result
    })

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const user = await User.findOne({
      where: {
        id: id
      },
      raw: true
    })
    if(!user) {
      throw new Error("User not found.")
    }
    let result = await User.destroy({
      where: {
        id: id
      }
    })
    res.status(200).json({
      success: true,
      message: "User Delete test.",
      data: result
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
})

router.get('/me', function (req, res) {
  res.status(200).json({
    message: "Success"
  })
})

module.exports = router;
