const executeQuery = require('../db/connection');
const {generateToken} = require('../common/commonFunction');
const bcrypt = require('bcrypt');

class Login{
    constructor(username, password){
        this.username = username;
        this.password = password;
    }

    async authenticate(){
        try {
            const rows = await executeQuery('SELECT * FROM user WHERE username = ?',[this.username]);
        
            if (rows.length === 0) return null;

            console.log(rows);
        
            const login = new Login(rows[0].username, rows[0].password);

            console.log(this.password);

            console.log(login.password);
        
              // Compare the hashed password
            const passwordMatch = await bcrypt.compare(this.password, login.password);
        
            if (!passwordMatch) return null;

            return generateToken(login, rows[0].id, rows[0].userType);

        } catch (error) {
          throw error;
        }
    }
}

module.exports = Login;