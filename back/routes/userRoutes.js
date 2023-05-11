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
router.get("/usersid", userController.get_userbyid);

//added by oz
router.get("/userid", userController.get_userbyiduser);
//ban
router.post("/users/ban/:mail", userController.post_ban_user);
router.get("/users/checkban/:email", userController.check_ban_user);


router.post("/users/", userController.post_update_user);

router.get("/getmailfromtoken", userController.get_get_email_from_token);

router.get("/all-experts", userController.show_experts_get);

router.get("/getallagences", userController.get_all_agences);

router.get("/getallexperts", userController.get_all_ExpCli);

router.post("/status/:email", userController.expert_status_on);

router.post("/statusoffline/:email", userController.expert_status_off);

router.get("/getallexperts_status", userController.get_all_experts_status);
router.post("/resetpassword", userController.post_change_password);

router.post("/update", userController.update_id_ag);
router.post("/updateagence", userController.update_agence);
router.post("/predictionuser", userController.get_prediction_user);
router.post("/genpredict", userController.generate_prediction_user);


module.exports = router;
