const userModel = require("../models/user");

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" , last_name :"" , first_name : ""};

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {      
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.signup_post = async (req, res) => {
  const { email, password, last_name, first_name } = req.body;
  try {
    const user = await userModel.create({ email, password, last_name, first_name });
    console.log(user);
    res.status(201).json("User Created , Success");
  } catch (err) {
    const errors = handleErrors(err);
    console.log({errors});
    res.status(400).json({ errors });
  }
};
