var express = require("express");
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
  (req, res) => {
    res.status(200).json({
      message: "facebook login OK",
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
    res.status(200).json({
      message: "facebook login OK",
      status: "success",
    });
  }
);

module.exports = router;
