const EleveModel = require("../models/eleve.model");

const checkUser = async (email) =>{
    const exist = await EleveModel.findOne({email: email});
    return exist;
};


const customError = (res, err) =>{
    return res.status(500).send({mesaage: process.env.NODE_ENV == "development" ? err : "server err",
});
};

module.exports.helpers ={
    checkUser,
    customError
};      