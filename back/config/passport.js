const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User1");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "919398135132-0heuietj7ctqin29oq2r2s60njtc5ah8.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        };
        console.log(newUser);

        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          done(null, user);
        } else {
          user = await User1.create(newUser);
          done(null, user);
        }
      }
    )
  );

  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });

  /*
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });*/
};
