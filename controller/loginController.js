const Login = require('../models/Login');

const LoginController = {
    authenticateUser: async(req, res) => {
        try{
            if(!req.body.email || !req.body.password){
                res.status(400).json({msg : 'Email Or Password Invalid!', Status : false});
            }
            const {email, password} = req.body;
    
            const newLogin = new Login(email, password);
    
            const token = await newLogin.authenticate();
    
            if (token == null){
                res.status(401).json({msg : 'Email Or Password Invalid!', Status : false});
            } else{
                token.Status = true;
                res.json(token);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Internal Server Error!', Status : false});
        }
    }
}

module.exports = LoginController;