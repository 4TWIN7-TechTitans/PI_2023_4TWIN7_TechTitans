const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const moment = require("moment");

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
    required: [false, "Please enter a password"],
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
    required: false,
    enum: ["Male", "Female"],
  },
  role: {
    type: String,
    required: false,
    maxlength: [50, "Role should not exceed 50 characters"],
    match: [/^[A-Za-z]+$/, "role should only contain letters"],
    enum: ["Admin", "Expert", "Agence", "Client"],
  },
  date_of_birth: {
    type: Date,
    required: false,
    validate: {
      validator: function (value) {
        return moment(value).isValid();
      },
      message: "Invalid date format",
    },
    min: [moment().subtract(120, "years"), "You must be at most 120 years old"],
    max: [moment().subtract(18, "years"), "You must be at least 18 years old"],
  },
  phone_number: {
    type: Number,
    required: false,
    match: [/^(\+216)?[0-9]{8}$/, "Phone number should start with +216 followed by 8 digits",
    ],
  },
  address: {
    type: String,
    required: false,
    match: [/^[a-zA-Z0-9\s,'-]*$/, "Address should only contain letters, numbers, spaces, commas, apostrophes and hyphens"],
  },
  verified: {
    type: Boolean,
    default: false
  },
  googleId:{
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  },
  id: {
    type:String,
    required: false
  },
  token: {
  type:String,
  required: false
  },
  two_factor_auth: {
    type: String,
    required: false,
    maxlength: [50, "Role should not exceed 50 characters"],
    match: [/^[A-Za-z]+$/, "role should only contain letters"],
    enum: ["none", "mail", "sms"],
  },
  two_factor_auth_code: {
    type: String,
  },
  phone_number: {
    type: String,
    required: false,
    match: [/^\+216[0-9]{8}$/, "Phone number should start with +216 followed by 8 digits"],
  }

});

// fire a function before doc saved to db
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

userSchema.statics.login2FA = async function (email, twoFactorCode) {
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("incorrect email");
  }
  if (user) {
    if (!(twoFactorCode === user.two_factor_auth_code)) {
      throw Error("incorrect 2fa code");
    }
    return user;
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
