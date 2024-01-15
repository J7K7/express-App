const mysql = require('mysql2/promise');
const config = require('../config');

const createPool = require('./connection');

async function query() {
    config.db.database = '';

    let connection = await mysql.createConnection(config.db);
  
    try {

        let query = `CREATE DATABASE IF NOT EXISTS mydb`;

        await connection.execute(query);

        connection.end();

        config.db.database = 'mydb';

        connection = await mysql.createConnection(config.db);

        console.log('Database Created If Not Exists !');

        query = `
            CREATE TABLE IF NOT EXISTS user (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255),
                email VARCHAR(255) UNIQUE,
                mobileNo VARCHAR(15) UNIQUE,
                password TEXT,
                image VARCHAR(255),
                dob DATETIME,
                userType VARCHAR(30)
            )
            `;

        await connection.execute(query);

        console.log('Tables Created If Not Exists !');

        query = `select count(id) as cnt from user`;

        let cnt = await connection.execute(query);

        if(cnt[0][0].cnt == 0){
          query = `insert into user(name, email, mobileNo, password, image, dob, userType) values
          ('abc', 'abc@gmail.com', '9316599621','$2b$10$obHOirF9Gdu4cAV13qxjpOMVCbStpoH68zIfgyfjpYKSDOiiCKuuu', '', '2000-01-07', 'admin');`;
          await connection.execute(query);
        }

      } catch (error) {
        console.error('Error executing query:', error);
      } finally{
        connection.end();
      }
  }
  
  query();