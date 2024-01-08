var express = require('express');
var router = express.Router();
var LoginController = require('../controller/loginController');

router.get('/', (req, res) => {
  res.send('Home Page');
});

router.post('/login', LoginController.authenticateUser);

module.exports = router;
