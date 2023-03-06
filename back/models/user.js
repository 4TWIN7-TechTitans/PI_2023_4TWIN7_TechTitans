const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
  last_name: {
    type: String,
    required: true,
    maxlength: [50, "Last name should not exceed 50 characters"],
    match: [/^[A-Za-z]+$/, "Last name should only contain letters"],
  },
  first_name: {
    type: String,
    required: true,
    maxlength: [50, "First name should not exceed 50 characters"],
    match: [/^[A-Za-z]+$/, "First name should only contain letters"],
  },
  gender: {
    type: String,
    required: true,
    enum:["Male","Female"],
  },
  role: {
    type: String,
    required: true,
    maxlength: [50, "Role should not exceed 50 characters"],
    match: [/^[A-Za-z]+$/, "role should only contain letters"],
    enum:["Admin","Expert","Agence","Client"],
  },
  date_naissance: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        const now = new Date();
        return value < now;
      },
      message: "Date of birth should be before today",
    },
  },
});

// fire a function after doc saved to db
/* userSchema.post("save", function (doc, next) {
  console.log("new user was created & saved", doc);
  next();
});*/

// fire a function before doc saved to db
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};



const User = mongoose.model("User", userSchema);

module.exports = User;
