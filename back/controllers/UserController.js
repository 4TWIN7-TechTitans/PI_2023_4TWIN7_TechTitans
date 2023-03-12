const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();
const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = {
    email: "",
    password: "",
    role: "",
  };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }


  //mail not verified
  if (err.message === "email not verified") {
    errors.email = "email not verified";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "That email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      switch (properties.path) {
        case "gender":
          errors.gender = "Please select a gender";
          break;
        case "role":
          errors.role = "Please select a role";
          break;
        case "date_of_birth":
          // date_of_birth is not required, so skip validation error
          break;
        case "phone_number":
          // phone_number is not required, so skip validation error
          break;
        case "address":
          // address is not required, so skip validation error
          break;
        default:
          errors[properties.path] = properties.message;
      }
    });
  }

  return errors;
};

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

//Controllers Actions

module.exports.signup_post = async (req, res) => {
  /*  #swagger.parameters['parameter_name'] = {
      in: 'body',
      schema: {
        "email": "Your-Email@gmail.com",
        "password": "Please enter your Password",
        "last_name": "John",
        "first_name": "Doe",
        "gender": "Male",
        "role": "Admin/Expert/Agence/Client",
        "date_of_birth": "Year/Month/DAy",
        "phone_number": "Please enter your phone number",
        "address": "Elmourouj"
      }
    }
  } */

  const {
    email,
    password,
    last_name,
    first_name,
    gender,
    role,
    date_of_birth,
    phone_number,
    address,
  } = req.body;
  try {
    const user = await userModel.create({
      email,
      password,
      last_name,
      first_name,
      gender,
      role,
      date_of_birth,
      phone_number,
      address,
    });

    // send verification email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_MARIEM,
        pass: process.env.PASS_MAIL_MARIEM,
      },
    });

    const verificationToken = createToken(user._id);
    user.verificationToken = verificationToken;
    const mailOptions = {
      from: process.env.EMAIL_MARIEM,
      to: email,
      subject: "Verify your email",
      html: `
        <h2>Welcome to Assurini!</h2>
        <p>Please click on the link below to verify your email address:</p>
        <a href="http://localhost:5000/verify-email/${verificationToken}">Verify Email</a>  
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(201).json({
      user_created: user._id,
      message: "User Created, Success",
      status: "success",
    });
  } catch (err) {
    const errors = handleErrors(err);
    console.log({ errors });
    res.status(400).json({ errors, status: "error" });
  }
};

// Verify email
module.exports.verify_email_get = async (req, res) => {
  const { token } = req.params;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // find user by id and verificationToken
    const user = await userModel.findOne({
      _id: decodedToken.id,
      verificationToken: token,
    });

    if (!user) {
      return res.status(400).send("Invalid verification token");
    }

    // update user document to mark email as verified
    user.verified = true;
    user.verificationToken = null;
    console.log(user);
    await userModel.updateOne(user);

    res.status(200).json({
      message: "Email verified successfully",
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Invalid or expired token",
      status: "error",
    });
  }
};

module.exports.login2FA = async (req, res) => {
  /*  #swagger.parameters['parameter_name'] = {
      in: 'body',
      schema: {
        "email": "exp@gmail.com",
        "code": "1245678"
      }
    }
  } */
  const { email, code } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw Error("email incorrect");
    }

    if (user.two_factor_auth == "false") {
      throw Error("2fa non activé");
    }

    const auth = await userModel.login2FA(email, code);
    const token = createToken(user._id);

    if (auth) {
      user.two_factor_auth_code = "";
      console.log(user);
      await userModel.updateOne(user);
      console.log(user);

      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user._id });
    } else {
      throw Error("code non valide");
    }
  } catch (err) {
    const errors = handleErrors(err);
    console.log({ errors });
    res.status(400).json({ errors, status: "error" });
  }
};

///password

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw Error("incorrect email");
    }

    // Check if email is verified
    if (!user.verified) {
      throw Error("email not verified");
    }

    if (user.two_factor_auth === "sms") {
      user.two_factor_auth_code = Math.floor(100000 + Math.random() * 900000);
      await userModel.updateOne(user);
      sendSms(user);
      throw Error("check your sms to 2FA auth"); // redirect
    }

    const auth = await userModel.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    console.log({ errors });
    res.status(400).json({ errors, status: "error" });
  }
};

module.exports.forgot_password_post = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw Error("User with that email address does not exist");
    }

    const resetToken = createToken(user._id);
    user.resetToken = resetToken;
    await user.save();

    // send password reset email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_MARIEM,
        pass: process.env.PASS_MAIL_MARIEM,
      },
    });

    const mailOptions = {
      from: "fadwa.berrich@esprit.tn",
      to: email,
      subject: "Reset your password",
      html: `
        <h2>Reset your password</h2>
        <p>Please click on the link below to reset your password:</p>
        <a href="http://localhost:5000/reset-password/${resetToken}">Reset Password</a>  
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(200).json({
      message: "Password reset email sent",
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Could not send password reset email",
      status: "error",
    });
  }
};

// Reset password form
module.exports.reset_password_get = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await userModel.findOne({ resetToken: token });
    if (!user) {
      return res.status(400).send("Invalid password reset token");
    }

    res.render("reset_password", { token });
  } catch (err) {
    console.log(err);
    res.status(400).send("Invalid password reset token");
  }
};

// Reset password
module.exports.reset_password_post = async (req, res) => {
  const { token, password } = req.body;

  try {
    const decodedToken = jwt.verify(token, "assurini secret");

    // find user by id and resetToken
    const user = await userModel.findOne({
      _id: decodedToken.id,
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).send("Invalid reset token or token expired");
    }

    // update user password and resetToken
    user.password = password;
    user.resetToken = null;
    user.resetTokenExpires = null;
    await user.save();

    res.status(200).json({
      message: "Password reset successful",
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Invalid or expired token",
      status: "error",
    });
  }
};

module.exports.logout_get = (req, res) => {
  /*  #swagger.parameters['parameter_name'] = {
      in: 'body',
      schema: {
        "email": "Enter your email address",
        "password": "Enter your password"
      }
    }
  } */
  /*   res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
    res.status(200).json({ user: user._id , message: "User Logged Out", status: "Success" }); */
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json({ message: "User logged out successfully." });
};

sendSms = (user) => {
  client.messages
    .create({
      body: "Twillio sms Test : " + user.two_factor_auth_code,
      from: process.env.TWILIO_SENDER,
      to: process.env.TWILIO_RECEIVER,
    })
    .then((message) => console.log(message.sid, user))
    .done();
};

module.exports.checkEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      res.send({ emailExists: true });
    } else {
      res.send({ emailExists: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};