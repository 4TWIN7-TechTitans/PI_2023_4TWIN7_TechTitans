const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = {
    email: "",
    password: "",
    gender: "",
    role: "",
    date_of_birth: "",
    phone_number: "",
    address: "",
  };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
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
          errors.date_of_birth = "Please enter a valid date of birth";
          break;
        case "phone_number":
          errors.phone_number = "Please enter a valid phone number";
          break;
        case "address":
          errors.address = "Please enter a valid address";
          break;
        default:
          errors[properties.path] = properties.message;
          break;
      }
    });
  }

  return errors;
};

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "assurini secret", {
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
        user: "mariem.nacib@esprit.tn",
        pass: "NACIBmariem_1",
      },
    });

    const verificationToken = createToken(user._id);
    user.verificationToken = verificationToken;
    const mailOptions = {
      from: 'mariem.nacib@esprit.tn',
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
    const decodedToken = jwt.verify(token, "assurini secret");

    // find user by id and verificationToken
    const user = await userModel.findOne({
      _id: decodedToken.id,
      verificationToken: token,
    });

    if (!user) {
      return res.status(400).send('Invalid verification token');
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
  res.clearCookie("jwt");
  res.status(200).json({ message: "User logged out successfully." });
};
