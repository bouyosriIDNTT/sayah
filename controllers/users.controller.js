const { helpers } = require("../helpers/helpers");
const { registerValidation } = require("../lib/validators/registration.validator");
const EleveModel = require("../models/eleve.model");
const { userModel } = require("../models/users.model");
const bcrypt = require("bcryptjs")


const Register = async (req, res) => {
    try {
        const values = await registerValidation.schemaValidation.validateAsync(
            req.body
            );
        const exist = await helpers.checkUser(req.body.email);
        if (exist){
            return res.status(409).send({message : "user exist"});
        }
        const hash = await bcrypt.hash(req.body.password, 10);
        req.body.password = hash; 
        console.log("here ", await EleveModel.create(req.body))
        const user = await EleveModel.create(req.body);
        res.send(user);
    } catch (error) {
        return helpers.customError(res, error);
    }
};

const FindAll = async (req, res) => {
    try{
        const users = await userModel.find().select("-password");
    return res.send(users);
    } catch (error) {
        return helpers.customError(res, error);
    }
};


const Delete = async (req, res) => {
    try{
        const users = await userModel.deleteOne({_id: req.params.id});
    return res.send("deleted successfully");
    } catch (error){
        console.log(error);
        return helpers.customError(res, error);
    }
};



module.exports.userController = {
    Register,
    FindAll,
    Delete
};