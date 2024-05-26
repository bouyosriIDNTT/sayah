const { helpers } = require("../helpers/helpers");
const { postModel } = require("../models/post.model");



const Add = async (req, res) => {
    
    try{

        req.body.user = req.user._id;
        const response = await postModel.create(req.body);
        return res.send(response);

    } catch (error) {
        return helpers.customError(res, error);
    }

};

const findAll = async (req, res) => {
    const posts = await postModel.find();
    return res.send(posts);
};

const findMyPosts = async (req, res) => {
    const posts = await postModel.find({user: req.user._id});
    return res.send(posts);
};

const deletePost = async (req, res) => {
    const posts = await postModel.deleteOne({ _id : req.params.id });
    return res.send(posts);
};

module.exports.postsController = {
    Add,
    findMyPosts,
    findAll,
    deletePost
};