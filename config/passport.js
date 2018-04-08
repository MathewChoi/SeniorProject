let JwtStrategy = require('passport-jwt').Strategy;
let ExtractJwt = require('passport-jwt').ExtractJwt;
let User = require('../models/User');
let config = require('../config/');

// Passport and strategy setup
module.exports = function(passport) {
  let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.auth.secret
  };

  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findOne({
      _id: jwt_payload._id
    }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
};
