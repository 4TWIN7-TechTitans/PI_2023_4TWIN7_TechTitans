const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    String,
    lowercase: true,
    required: [true, "Please enter a valid email"],
    unique: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    String,
    required: [true, "Please enter a Password"],
    minlength: [6, "Minimum password length is 6 characters"],
    maxlength: [14, "Maximum password length is 6 characters"],
  },
  last_name: { String, required: true },
  first_name: { String, required: true },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
