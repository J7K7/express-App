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
                username VARCHAR(255) UNIQUE,
                name VARCHAR(255),
                email VARCHAR(255),
                mobileNo VARCHAR(15),
                password TEXT,
                image VARCHAR(255),
                userType VARCHAR(30)
            )
            `;

        await connection.execute(query);

        console.log('Tables Created If Not Exists !');

      } catch (error) {
        console.error('Error executing query:', error);
      } finally{
        connection.end();
      }
  }
  
  query();