var express = require('express');
var router = express.Router();
var LoginController = require('../controller/loginController');


router.post('/login', LoginController.authenticateUser);

module.exports = router;
