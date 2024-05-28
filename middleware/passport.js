const passport = require('passport');
const userModel = require('../models/users.model');

const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

// Verify that JWT_SECRET is loaded
console.log('JWT_SECRET:', process.env.JWT_SECRET);

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await userModel.findOne({ _id: jwt_payload.id });
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    })
  );
};
