const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const users = require('./users.model');

const enseignantSchema = new Schema ({

specialite:[{
    nom:{
        type:String,
        required:true
    },          
    }],
    
Publication:[{
    DateDeCreation: {
        type: String,
        required: false
    },

    Contenu: {
        type: String,
        required: false 
    },
  
}],

GroupeMatiere:[{
    idGroupe: {
        type: String,
        required: false
    },
  idMatiere: {
        type: String,
        required: false
    },
 
}],



});


module.exports= users.discriminator('Enseignant',enseignantSchema);
