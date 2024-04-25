const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
        user: { type: Schema.Types.ObjectId, ref: "users" },
        title: {
            type : String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },

});

module.exports.postModel = mongoose.model("posts", postSchema);