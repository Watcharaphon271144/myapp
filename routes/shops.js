var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.send('respond with a shops resource');
});

router.get('/name', function (request, response) {
  response.status(200).json({
    name: "Coffee",
    city: "Khon Kaen"
  })
})

router.post('/name', function (req, res) {
  try {
    let body = req.body
    if (!body.name) {
      throw new Error("กรุณาส่งชื่อมาด้วย")
    }
    if (!body.city) {
      throw new Error("กรุณาส่งเมืองมาด้วย")
    }
    res.status(200).json({
      name: body.name,
      city: body.city
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
})

module.exports = router;
