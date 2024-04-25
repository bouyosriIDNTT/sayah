const { helpers } = require("../helpers/helpers");
const bcrypt =require("bcryptjs");
const jwt = require("jsonwebtoken");
const Login = async (req, res) =>{
try{
    const exist = await helpers.checkUser(req.body.email);
    if(!exist){
        return res.status(404).send({message: "user not found"});
    }
    const isMatch = await bcrypt.compare(req.body.password, exist.password);
    if(!isMatch){
        return res.status(401).send({message: "password not matches"});
    }
    const payload = {
        id: exist._id,
        email: exist.email,
        role: exist.role,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "1h",
    });


    return res.send({token: token});
    
} catch (error){
    return helpers.customError(res, error);
}
};



module.exports.authController = {
    Login,
};