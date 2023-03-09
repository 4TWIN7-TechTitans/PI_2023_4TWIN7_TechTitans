var express = require("express");
var router = express.Router();
const passport = require("passport");

/* GET home page. */
// @desc Auth with google
//@route GET /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

/* GET home page. */
// @desc Auth with google
//@route GET /auth/google
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/users");
  }
);

//@desc logout user
//@route /auth/logout
router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
