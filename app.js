const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const passport = require('passport');

const { userRouter } = require('./routes/users.route');
const { authRouter } = require('./routes/auth.route');
const { postRouter } = require('./routes/posts.route');
const { adminRouter } = require('./routes/admin.route');
const { superAdminRouter } = require('./routes/superAdmin.route');
const { enseignantRouter } = require('./routes/enseignant.route');
const { groupeRouter } = require('./routes/groupe.route');
const { testsRouter } = require('./routes/tests.route');


const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
require('./middleware/passport')(passport);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database connection error:', err));


// Define other routes
app.use("/api", [
  userRouter,
  authRouter,
  postRouter,
  adminRouter,
  superAdminRouter,
  enseignantRouter,
  groupeRouter,
  testsRouter
]);

// Error handling middleware
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = app;
