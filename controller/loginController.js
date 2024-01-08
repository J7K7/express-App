const Login = require('../models/Login');

const LoginController = {
    authenticateUser: async(req, res) => {
        const {username, password} = req.body;

        const newLogin = new Login(username, password);

        const token = await newLogin.authenticate();

        if (token == null){
            res.json({'msg' : 'Username Or Password Invalid !'});
        } else{
            res.json({token})
        }
    }
}

module.exports = LoginController;