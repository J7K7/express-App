const jwt = require('jsonwebtoken');
const Login = require('../models/Login');

const secretKey = 'your-secret-key';

function generateToken(loginData, userId, userType){
    try{
        const token = jwt.sign({ username : loginData.username, userId : userId, userType : userType}, secretKey, { expiresIn : '1h'});
        return token;
    } catch(error){
        console.log('Error In Generating Token : ' + error);
        throw error;
    }
}

function authenticateToken(req, res, next) {
    const authorizationHeader = req.headers.authorization;
  
    if (!authorizationHeader) {
      return res.sendStatus(401);
    }
  
    // Split the header into an array ["Bearer", "your-token"]
    const [bearerPrefix, token] = authorizationHeader.split(' ');
  
    if (bearerPrefix !== 'Bearer' || !token) {
      return res.sendStatus(401);
    }
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
  
      req.user = user;
      next();
    });
  }

module.exports = {generateToken, authenticateToken};