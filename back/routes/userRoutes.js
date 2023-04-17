const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController.js");
const { checkEmail } = require("../controllers/UserController.js");

router.get("/check-email/:email", checkEmail);

router.post("/signup", userController.post_signup);
router.post("/add", userController.add_post);
router.post("/login", userController.login_post);

router.get("/logout", userController.logout_get);
router.get("/verify-email/:token", userController.verify_email_get);
router.post(
  "/resend-verification/:email",
  userController.resend_verification_post
);
router.post("/2fa", userController.login2FA);
router.post("/forget-password/:email", userController.forgot_password_post);
router.post("/reset-password", userController.reset_password_post);
router.get("/all-users", userController.show_users_get);
router.get("/userbyemail/:email", userController.get_user_by_email);
router.get("/users/:email", userController.get_user_by_email);
router.get("/usersid/:id", userController.get_userbyid);

//ban
router.post("/users/ban/:mail", userController.post_ban_user);
router.get("/users/checkban/:email", userController.check_ban_user);


router.post("/users/", userController.post_update_user);

router.get("/getmailfromtoken", userController.get_get_email_from_token);

router.get("/all-experts", userController.show_experts_get);

router.get("/getallagences", userController.get_all_agences);

router.get("/getallexperts", userController.get_all_ExpCli);

router.post("/updateAvailability/:email", userController.updateAvailability);


module.exports = router;
