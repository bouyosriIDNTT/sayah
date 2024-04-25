var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
var logger = require('morgan');
const { userRouter } = require('./routes/users.route');
const { authRouter } = require('./routes/auth.route');
const passport = require("passport");
const { postRouter } = require('./routes/posts.route');


var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(passport.initialize());
require("./middleware/passport")(passport);

mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("db connected"))
.catch((err) => console.log(err));


app.use("/api", [userRouter, authRouter, postRouter]);


module.exports = app;
