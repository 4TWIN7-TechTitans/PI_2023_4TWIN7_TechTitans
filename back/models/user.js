const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: {
    String,
    lowercase: true,
    required: true,
    unique: true
  },
  password: { String, required: true , minLength: 6 , maxLength: 14 },
  last_name: { String, required: true },
  first_name: { String, required: true },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
