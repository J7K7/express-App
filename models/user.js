const bcrypt = require('bcrypt');
const executeQuery = require('../db/connection');

class User{

    constructor(username, name, email, mobileNo, password, image, userType){
        this.username = username;
        this.password = password;
        this.email = email;
        this.name = name;
        this.mobileNo = mobileNo;
        this.image = image;
        this.userType = userType;
    }

    async register(){
        try {

            const hashedPassword = await bcrypt.hash(this.password, 10);
            const sql = 'Insert into user (username, password, email, name, mobileNo, image, userType) values(?,?,?,?,?,?,?)';
            const params = [this.username, hashedPassword, this.email, this.name, this.mobileNo, this.image, this.userType];
            const result = await executeQuery(sql, params);

            if (result && result.affectedRows > 0) {
                console.log('Query inserted successfully!');
            } else {
                console.log('Query did not insert any rows.');
            }
        
            return "User Register Successfully !";

        } catch (error) {
            throw error;
        }
    }

    async getAllUsers(){
        try {
            const rows = await executeQuery('SELECT * FROM user');
            console.log('Rows:', rows); // Add this line for logging
            return rows.map(row => new User(row.id, row.username, row.email, row.password, row.userType, row.image));
        } catch (error) {
          throw error;
        }
    }
}

module.exports = User;