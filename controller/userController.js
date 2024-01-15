const fs = require('fs');
const User = require('../models/user');

const userController = {
    registerUser: async (req, res) => {
        try {
            
            if(!req.body.email || !req.body.password || !req.body.name || !req.body.mobileNo || !req.body.dob){
                res.status(400).json({msg : 'Enter All Details!', Status : false});
            }

            const { name, email, mobileNo, password, dob, userType} = req.body;
            let image = null;
            if (req.file && req.file.filename !== undefined) {
                image = req.file.filename;
            }

            const newUser = new User(name, email, mobileNo, password, image, dob, userType);
            
            const message = await newUser.register();

            if(message == 'User Register Successfully!'){
                res.status(201).json({ msg: message, Status : true });
            } else{
                if (req.file) {
                    fs.unlinkSync(req.file.path);
                }
                res.status(409).json({ msg: message, Status : false });
            }

        } catch (error) {
            console.error(error);
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            res.status(500).json({ msg: 'Internal Server Error!', Status : false});
        }
    },

    signIn: async (req, res) => {
        try {
            if(!req.body.email || !req.body.password || !req.body.name || !req.body.mobileNo || !req.body.dob){
                res.status(400).json({msg : 'Enter All Details!', Status : false});
            }
            const { name, email, mobileNo, password, dob} = req.body;
            const userType = 'user';
            let image = null;
            if (req.file && req.file.filename !== undefined) {
                image = req.file.filename;
            }

            const newUser = new User(name, email, mobileNo, password, image, dob, userType);
            
            const message = await newUser.register();

            if(message == 'User Register Successfully!'){
                res.status(201).json({ msg: message, Status : true });
            } else{
                if (req.file) {
                    fs.unlinkSync(req.file.path);
                }
                res.status(409).json({ msg: message, Status : false });
            }

        } catch (error) {
            console.error(error);
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            res.status(500).json({ msg: 'Internal Server Error!', Status : false});
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const userInstance = new User(); // create an instance
            const users = await userInstance.getAllUsers();
            const response = {users, Status : true}
            res.status(201).json(response);
        } catch (error) {
          console.error(error);
          res.status(500).json({ msg: 'Internal Server Error!', Status : false});
        }
    }
}

module.exports = userController;

