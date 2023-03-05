const userModel = require("../models/user");
const jwt = require('jsonwebtoken');


// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}



// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'assurini secret', {
    expiresIn: maxAge
  });
};


//Controllers Actiions 
module.exports.signup_post = async (req, res) => {
  const { email, password, last_name, first_name } = req.body;
  try {
    const user = await userModel.create({
      email,
      password,
      last_name,
      first_name,
    });
    const token = createToken(user._id);
    console.log(user);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user_created: user._id, message: "User Created, Success" , status : "success" } );
  } 
  catch (err) {
    const errors = handleErrors(err);
    console.log({ errors });
    res.status(400).json({ errors , status : "error" });
  }
};



module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id , status: 'success' });
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(200).json({ errors, message: "User Login Failed", status: "error" });
  }

}

  module.exports.logout_get = (req, res) => {    
 /*   res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
    res.status(200).json({ user: user._id , message: "User Logged Out", status: "Success" }); */
    res.clearCookie('jwt');
    res.status(200).json({ message: "User logged out successfully." });
  }
 
