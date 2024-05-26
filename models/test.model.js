const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    reponse: [{
        option: String,
        isCorrect: Boolean
    }],
    specialite: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Specialite'
    },
    note: {
        option: String,
    },
});

module.exports=mongoose.model('Test',testSchema);
