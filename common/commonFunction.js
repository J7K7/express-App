const jwt = require('jsonwebtoken');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
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
        return res.status(401).json({ msg: 'Session Expired!', Status : false });
      } else{
        req.user = user;
        next();
      }
    });
  }

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      console.log(req.body);
      const uploadPath = path.join(__dirname, '../public', 'images');
      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        if (!file) {
          console.log('No file provided');
            // No file provided, proceed without an image name
            cb(null, '');

        } else {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
        }
    },
    fileFilter: (req, file, cb) => {
      // Define your expected field names here
      const expectedFieldNames = ['image'];

      // Check if the received field name is expected
      if (expectedFieldNames.includes(file.fieldname)) {
          cb(null, true); // Accept the file
      } else {
          cb(new Error('Unexpected field'), false); // Reject the file
      }
  },
});

function getDate(dateString){
  const dateObject = new Date(dateString);

  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const day = String(dateObject.getDate()).padStart(2, '0');

  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}

const uploadImage = multer({ storage: storage });

module.exports = {generateToken, authenticateToken, uploadImage, getDate};