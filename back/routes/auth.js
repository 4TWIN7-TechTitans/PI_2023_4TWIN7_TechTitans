var express = require("express");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
var router = express.Router();
const passport = require("passport");

/* GET home page. */
// @desc Auth with google
//@route GET /auth/google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

/* GET home page. */
// @desc Auth with google
//@route GET /auth/google
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  async (req, res) => {
// creation de token apres connexion google
    const maxAge = 3 * 24 * 60 * 60;
    const createToken = (id) => {
      return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge,
      });
    };
    const token = createToken(req.user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(200).json({
      message: "/admin/index",
      status: "success",
    });
  }
);

//@desc logout user
//@route /auth/logout
router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("http://localhost:3000");
  });
});

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  function (req, res) {
    // Successful authentication, redirect home.

    const maxAge = 3 * 24 * 60 * 60;
    const createToken = (id) => {
      return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge,
      });
    };
    const token = createToken(req.user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(200).json({
      message: "/admin/index",
      status: "success",
    });
  }
);

module.exports = router;
