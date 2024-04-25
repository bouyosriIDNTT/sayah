const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    nom:{
        type:String,
        required:true
    },

    prenom:{
                 type:String,
                 required:true
           },

    email:{
        type:String,
        required:true,
        unique:true,
        validate:
        function ValidateEmail(mail) 
    {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
    return (true)
    console.log('You have entered a valid email address!!')
    }
    console.log("You have entered an invalid email address!")
    return (false)
    }
    },
    password: {
        type : String,
        required: true,
    },
    
    role: {
        type : String,
        required: true,
        default: "USER",
    },

})



module.exports.userModel = mongoose.model('users', userSchema);