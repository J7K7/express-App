const executeQuery = require('../db/connection');
const {generateToken} = require('../common/commonFunction');
const bcrypt = require('bcrypt');

class Login{
    constructor(email, password){
        this.email = email;
        this.password = password;
    }

    async authenticate(){
        try {
            const rows = await executeQuery('SELECT * FROM user WHERE email = ?',[this.email]);
        
            if (rows.length === 0) return null;
        
            const login = new Login(rows[0].email, rows[0].password);
        
              // Compare the hashed password
            const passwordMatch = await bcrypt.compare(this.password, login.password);
        
            if (!passwordMatch) return null;

            const token = generateToken(login, rows[0].id, rows[0].userType);
            if(token == null){
              return token;
            }
            const response = {
              'token' : token,
              'userType' : rows[0].userType,
              'name' : rows[0].name,
              'image' : rows[0].image
            };

            return response;

        } catch (error) {
          throw error;
        }
    }
}

module.exports = Login;