const express = require ("express");
const { postsController } = require("../controllers/posts.controller");
const router = express.Router();
const passport = require ("passport");
const { roleMiddleware } = require("../middleware/role");
const{inRole, Roles} = roleMiddleware;

router.post("/posts", passport.authenticate("jwt", {session: false}),
 postsController.Add);

 router.get(
    "/posts",
    passport.authenticate("jwt", {session: false}),
    inRole(Roles.ADMIN),
    postsController.findAll
 );


 router.get(
    "/posts/me",
    passport.authenticate("jwt", {session: false}),
    postsController.findMyPosts
 );

 router.delete(
   "/posts/:id",
   passport.authenticate("jwt", {session: false}),
   postsController.deletePost
);


module.exports.postRouter = router;