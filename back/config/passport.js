const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/user");
var path = require("path");
require("dotenv").config();

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.Google_clientID,
        clientSecret: process.env.Google_clientSecret,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        var randomstring = Math.random().toString(36).slice(-8);
        const newUser = {
          googleId: profile.id,
          verified: true,
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
          image: profile.photos[0].value,
          email: profile.emails[0].value,
          date_of_birth:"",
          address:"",
          id:"",
          token:"",
          banned:false,
          phone_number:"",
          password: randomstring,
          role:"Client",
          two_factor_auth: "none",
          two_factor_auth_code: "",
        };
        console.log(newUser);

        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          done(null, user);
        } else {
          user = await User.create(newUser);
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

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FB_clientID,
        clientSecret: process.env.FB_clientSecret,
        callbackURL: "http://localhost:5000/auth/facebook/callback",
        profileFields: [
          "id",
          "displayName",
          "name",
          "gender",
          "picture.type(large)",
          "email",
        ],
      },
      function (token, refreshToken, profile, done) {
        // asynchronous
        process.nextTick(async function () {
          // find the user in the database based on their facebook id

          let user = await User.findOne({ id: profile.id });
          // if there is an error, stop everything and return that
          // ie an error connecting to the database

          // if the user is found, then log them in
          if (user) {
            console.log("user found");
            console.log(user);
            return done(null, user); // user found, return that user
          } else {
            // if there is no user found with that facebook id, create them
            var newUser = new User();

            // set all of the facebook information in our user model
            newUser.id = profile.id; // set the users facebook id
            newUser.token = token; // we will save the token that facebook provides to the user
            newUser.first_name = profile.name.givenName;
            newUser.last_name = profile.name.familyName;
            newUser.verified = true;
            newUser.date_of_birth="";
            newUser.address="";
            newUser.id="";
            newUser.token="";
            newUser.banned=false;
            newUser.phone_number="";
            newUser.role = "Client";
            newUser.two_factor_auth = "none";
            newUser.two_factor_auth_code = "";
            // newUser.name  = profile.name.familyName; // look at the passport user profile to see how names are returned
            newUser.email = profile.emails[0].value;
            var randomstring = Math.random().toString(36).slice(-8);
            // facebook can return multiple emails so we'll take the first
            newUser.password = randomstring;
            // save our user to the database
            user = await User.create(newUser);
            done(null, user);
          }
        });
      }
    )
  );
};
