const bcrypt = require('bcrypt');
const executeQuery = require('../db/connection');
const { getDate } = require('../common/commonFunction');

class User{

    constructor(name, email, mobileNo, password, image, dob, userType){
        this.password = password;
        this.email = email;
        this.name = name;
        this.mobileNo = mobileNo;
        this.image = image;
        this.userType = userType;
        this.dob = dob;
    }

    async register(){
        try {
            let query = 'select count(email) as cnt from user where email = ?;';
            let queryParams = [this.email];

            let cnt = await executeQuery(query, queryParams);
            if(cnt[0].cnt != 0){
                return 'Email Already Exists!';
            }

            query = 'select count(mobileNo) as cnt from user where mobileNo = ?;';
            queryParams = [this.mobileNo];

            cnt = await executeQuery(query, queryParams);
            if(cnt[0].cnt != 0){
                return 'Mobile Number Already Exists!';
            }

            const hashedPassword = await bcrypt.hash(this.password, 10);
            const sql = 'Insert into user (password, email, name, mobileNo, image, dob, userType) values(?,?,?,?,?,?,?)';
            const params = [hashedPassword, this.email, this.name, this.mobileNo, this.image, this.dob, this.userType];
            const result = await executeQuery(sql, params);

            if (result && result.affectedRows > 0) {
                console.log('Query inserted successfully!');
            } else {
                console.log('Query did not insert any rows.');
            }
        
            return "User Register Successfully!";

        } catch (error) {
            throw error;
        }
    }

    async getAllUsers(){
        try {
            const rows = await executeQuery('SELECT * FROM user');

            return rows.map(row => new User(row.name, row.email, row.mobileNo, row.password, row.image, getDate(row.dob), row.userType));
        } catch (error) {
          throw error;
        }
    }
}

module.exports = User;