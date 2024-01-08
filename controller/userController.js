const User = require('../models/user');

const userController = {
    registerUser: async (req, res) => {
        try {
            const { username, name, email, mobileNo, password, userType} = req.body;
            image = req.file.filename;

            const newUser = new User(username, name, email, mobileNo, password, image, userType);
            
            const message = await newUser.register();

            res.status(201).json({ msg: message });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const userInstance = new User(); // create an instance
            const users = await userInstance.getAllUsers();
            res.json(users);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = userController;

