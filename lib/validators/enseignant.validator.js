const Joi = require('joi');
const schemaValidation = Joi.object({
    nom: Joi.string().required(),
    prenom: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string(),
    repeat_password: Joi.ref('password'),
    specialite: Joi.array().required(),

}).with('password', 'repeat_password');




module.exports.enseignantValidation = {
    schemaValidation,
};