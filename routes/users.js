var express = require('express');
var router = express.Router();
var userController = require('../controller/userController');
var {authenticateToken, uploadImage} = require('../common/commonFunction');

router.get('/getAll', authenticateToken, userController.getAllUsers);
router.post('/register', authenticateToken, uploadImage.single('image'), userController.registerUser);
router.post('/signIn', uploadImage.single('image'), userController.signIn);

module.exports = router;
