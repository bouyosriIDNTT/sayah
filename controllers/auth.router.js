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
        __t: exist.__t,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "1h",
    });


    return res.send({token: token});
    
} catch (error){
    return helpers.customError(res, error);
}
};



const Logout = async (req, res) => {
    try {
      return res.send({ message: "Logout successful" });
    } catch (error) {
      // Handle errors
      return helpers.customError(res, error);
    }
  };

// Function to verify and decode JWT token
const getUserFromToken = (token) => {
    try {
        // Verify and decode the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        // Extract user information from the decoded token
        const user = {
            id: decodedToken.id,
            email: decodedToken.email,
            nom: decodedToken.nom,
            prenom: decodedToken.prenom,
            __t: decodedToken.__t,
        };

        return user;
    } catch (error) {
        // Handle invalid or expired token
        console.error('Error decoding token:', error);
        return null;
    }
};

module.exports.authController = {
    Login,
    Logout,
    getUserFromToken
};