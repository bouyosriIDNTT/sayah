const express = require ("express");
const { authController } = require("../controllers/auth.router");
const router = express();


router.post("/login", authController.Login);


module.exports.authRouter = router;