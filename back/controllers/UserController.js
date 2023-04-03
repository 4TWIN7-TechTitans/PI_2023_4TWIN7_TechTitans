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
    tfa: "",
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

  // 2fa code generated
  if (err.message === "check your sms to 2FA auth") {
    errors.tfa = "check your sms to 2FA auth";
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
const sendVerifMail = async (mail, code) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_MARIEM,
      pass: process.env.PASS_MAIL_MARIEM,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_MARIEM,
    to: mail,
    subject: "Verify your email",
    html: `
    <!DOCTYPE html>
    <html>
    
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <style type="text/css">
            @media screen {
                @font-face {
                    font-family: 'Lato';
                    font-style: normal;
                    font-weight: 400;
                }
    
                @font-face {
                    font-family: 'Lato';
                    font-style: normal;
                    font-weight: 700;
                }
    
                @font-face {
                    font-family: 'Lato';
                    font-style: italic;
                    font-weight: 400;
                }
    
                @font-face {
                    font-family: 'Lato';
                    font-style: italic;
                    font-weight: 700;
                }
            }
    
            /* CLIENT-SPECIFIC STYLES */
            body,
            table,
            td,
            a {
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }
    
            table,
            td {
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }
    
            img {
                -ms-interpolation-mode: bicubic;
            }
    
            /* RESET STYLES */
            img {
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
            }
    
            table {
                border-collapse: collapse !important;
            }
    
            body {
                height: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
            }
    
            /* iOS BLUE LINKS */
            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }
    
            /* MOBILE STYLES */
            @media screen and (max-width:600px) {
                h1 {
                    font-size: 32px !important;
                    line-height: 32px !important;
                }
            }
    
            /* ANDROID CENTER FIX */
            div[style*="margin: 16px 0;"] {
                margin: 0 !important;
            }
        </style>
    </head>
    
    <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
        <!-- HIDDEN PREHEADER TEXT -->
        <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account.
        </div>
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <!-- LOGO -->
            <tr>
                <td bgcolor="#172b4d" align="center">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td bgcolor="#172b4d" align="center" style="padding: 0px 10px 0px 10px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome!</h1> <img src="cid:logo" width="125" height="120" style="display: block; border: 0px;" />
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                <p style="margin: 0;">We're excited to have you get started. First, you need to confirm your account. Just press the button below.</p>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#ffffff" align="left">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                            <table border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td align="center" style="border-radius: 3px;" bgcolor="#172b4d"><a href="http://localhost:5000/verify-email/${code}" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #172b4d; display: inline-block;">Confirm Account</a></td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr> <!-- COPY -->
                        <tr>
                            <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                <p style="margin: 0;">Sent By :<br>Assurini Team</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td bgcolor="#F0FFFF" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Contact us on :</h2>
                                <p style="margin: 0;"><a href="#" target="_blank" style="color: #172b4d;">assurini.tunisien0reply@gmail.com </a></p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
                                <p style="margin: 0;">If these emails get annoying, please feel free to <a href="#" target="_blank" style="color: #111111; font-weight: 700;">unsubscribe</a>.</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    
    </html>
  `,
    //   <a href="http://localhost:5000/verify-email/${verificationToken}">Verify Email</a>
    attachments: [
      {
        filename: "logo.png",
        path: "./public/images/logo.png",
        cid: "logo",
      },
    ],
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent: " + info.response);
};

module.exports.post_signup = async (req, res) => {
  /*  #swagger.parameters['parameter_name'] = {
      in: 'body',
      schema: {
        "email": "dddd@gmail.com",
        "password": "12345678",
        "last_name": "Flen",
        "first_name": "Ben Flen",
        "gender": "Male",
        "role": "Client",
        "date_of_birth": "1990/01/01",
        "phone_number": "+21612345678",
        "address": "Elmourouj"
      }
    }
  } */

  try {
    const user = await userModel.create({
      ...req.body,
      googleId: "",
      image: "",
      id: "",
      token: "",
      two_factor_auth: "none",
      two_factor_auth_code: "",
      banned: "false",
    });

    const verificationToken = createToken(user._id);
    user.verificationToken = verificationToken;

    await sendVerifMail(user.email, verificationToken);

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

module.exports.add_post = async (req, res) => {
  /*  #swagger.parameters['parameter_name'] = {
      in: 'body',
      schema: {
        "email": "bbbb@gmail.com",
        "password": "12345678",
        "last_name": "John",
        "first_name": "Doe",
        "gender": "Male",
        "role": "Client",
        "date_of_birth": "Year/Month/Day",
        "phone_number": "+21612345678",
        "address": "Elmourouj"
      }
    }
  } */

  try {
    const user = await userModel.create({
      ...req.body,
      verified: "true",
    });
    if (user) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_MARIEM,
          pass: process.env.PASS_MAIL_MARIEM,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_MARIEM,
        to: user.email,
        subject: "You've Been Added to Assurini!",
        html: `
 <!DOCTYPE html>
        <html>
        
        <head>
            <title></title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <style type="text/css">
                @media screen {
                    @font-face {
                        font-family: 'Lato';
                        font-style: normal;
                        font-weight: 400;
                    }
        
                    @font-face {
                        font-family: 'Lato';
                        font-style: normal;
                        font-weight: 700;
                    }
        
                    @font-face {
                        font-family: 'Lato';
                        font-style: italic;
                        font-weight: 400;
                    }
        
                    @font-face {
                        font-family: 'Lato';
                        font-style: italic;
                        font-weight: 700;
                    }
                }
        
                /* CLIENT-SPECIFIC STYLES */
                body,
                table,
                td,
                a {
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                }
        
                table,
                td {
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                }
        
                img {
                    -ms-interpolation-mode: bicubic;
                }
        
                /* RESET STYLES */
                img {
                    border: 0;
                    height: auto;
                    line-height: 100%;
                    outline: none;
                    text-decoration: none;
                }
        
                table {
                    border-collapse: collapse !important;
                }
        
                body {
                    height: 100% !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    width: 100% !important;
                }
        
                /* iOS BLUE LINKS */
                a[x-apple-data-detectors] {
                    color: inherit !important;
                    text-decoration: none !important;
                    font-size: inherit !important;
                    font-family: inherit !important;
                    font-weight: inherit !important;
                    line-height: inherit !important;
                }
        
                /* MOBILE STYLES */
                @media screen and (max-width:600px) {
                    h1 {
                        font-size: 32px !important;
                        line-height: 32px !important;
                    }
                }
        
                /* ANDROID CENTER FIX */
                div[style*="margin: 16px 0;"] {
                    margin: 0 !important;
                }
            </style>
        </head>
        
        <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
            <!-- HIDDEN PREHEADER TEXT -->
            <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account.
            </div>
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <!-- LOGO -->
                <tr>
                    <td bgcolor="#172b4d" align="center">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#172b4d" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                    <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Assurini Team want to tell you : </h1> <img src="cid:logo" width="125" height="120" style="display: block; border: 0px;" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                <td bgcolor="#ffffff" align="left">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                <table border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td align="center" style="border-radius: 3px;" bgcolor="#172b4d"><p  style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #172b4d; display: inline-block;">Welcome !</p></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr> <!-- COPY -->
                <tr>
                    <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">

                                    <p style="margin: 0;">
                                    Dear ${user.first_name} ${user.last_name},<br>
                                    We're excited to inform you that you have been added to our website, Assurini! Your profile is now live on our platform, and our users can now discover and connect with your agency.

                                    We believe that your expertise and services will be a great addition to our platform, and we're excited to see the value you will bring to our users. We hope this partnership will be beneficial to both of our organizations.</p>
                                </td>
                            </tr>

                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Best regards,<br>Assurini Team</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#F0FFFF" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p>
                                    If you have any questions or concerns, please don't hesitate to reach out to us at
                                    
                                    </p>
                                    <p style="margin: 0;"><a href="#" target="_blank" style="color: #172b4d;">assurini.tunisien0reply@gmail.com </a></p>
                                    <p> or through our website's contact form.
                                   <br> Thank you for being a part of Assurini!</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
                                    <p style="margin: 0;">If these emails get annoying, please feel free to <a href="#" target="_blank" style="color: #111111; font-weight: 700;">unsubscribe</a>.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        
        </html>
        `,
        attachments: [
          {
            filename: "logo.png",
            path: "./public/images/logo.png",
            cid: "logo",
          },
        ],
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
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
      //invalid
      res.redirect("http://localhost:3000/auth/error");
    }

    // update user document to mark email as verified
    user.verified = true;
    user.verificationToken = null;
    console.log(user);
    await userModel.findByIdAndUpdate(decodedToken.id, { verified: 'true' });
    //success so we can login
    res.redirect("http://localhost:3000/auth/login");
  } catch (err) {
    console.log(err);
    //expired
    res.redirect("http://localhost:3000/auth/error");
  }
};

// Resend verification email
module.exports.resend_verification_post = async (req, res) => {
  const email = req.params.email;
  //const { email } = req.body;

  try {
    // find user by email
    const user = await userModel.findOne({ email });

    if (!user) {
      console.log("user not found");
      return res
        .status(400)
        .json({ message: "User not found", status: "error" });
    }

    if (user.verified) {
      console.log("user already exists");
      return res
        .status(400)
        .json({ message: "Email already verified", status: "error" });
    }

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
      <h1>Resend verification email</h1>
      <p>Hello,</p>
      <p>We received a request to resend the verification email for your account. Please click on the following link to verify your email address:</p>
      <a href="http://localhost:5000/verify-email/${verificationToken}">verify</a>
      <p>If you did not request a resend of the verification email, please ignore this message.</p>
      <img src="cid:logo" alt="logo">
    
    `,
      attachments: [
        {
          filename: "logo.png",
          path: "./public/images/logo.png",
          cid: "logo",
        },
      ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    await user.save();

    res.status(200).json({
      message: "Verification email resent successfully",
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error resending verification email",
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
      await userModel.findByIdAndUpdate(user._id, { two_factor_auth_code: "" });
      res.cookie("jwt", token, { maxAge: maxAge * 1000 });
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const user1 = await userModel.findOne({
        _id: decodedToken.id,
        verificationToken: token,
      });

      res.cookie("firstname", user1.first_name, {
        expiresIn: maxAge, // same as above
      });
      res.cookie("lastname", user1.last_name, {
        expiresIn: maxAge, // same as above
      });
      res.cookie("role", user1.role, {
        expiresIn: maxAge, // same as above
      });

      res.cookie("userid", user1._id, {
        expiresIn: maxAge, // same as above
      });
      res.status(200).json({ user: user._id, role: user.role });
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
      const code = Math.floor(100000 + Math.random() * 900000);
      await userModel.findByIdAndUpdate(user._id, {
        two_factor_auth_code: code,
      });
      // sendSms(user);
      throw Error("check your sms to 2FA auth"); // redirect
    }

    const auth = await userModel.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    let nextLink = "";

    if (user.role === "Admin") nextLink = "/admin/index";
    if (user.role === "Client") nextLink = "/";
    if (user.role === "Agence") nextLink = "/admin/index";
    if (user.role === "Expert") nextLink = "/admin/index";

    //TODO : TEMPLATES
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user1 = await userModel.findOne({
      _id: decodedToken.id,
      verificationToken: token,
    });

    res.cookie("firstname", user1.first_name, {
      expiresIn: maxAge, // same as above
    });
    res.cookie("lastname", user1.last_name, {
      expiresIn: maxAge, // same as above
    });
    res.cookie("role", user1.role, {
      expiresIn: maxAge, // same as above
    });

    res.cookie("userid", user1._id, {
      expiresIn: maxAge, // same as above
    });

    res.status(200).json({ user: user._id, next: nextLink });
  } catch (err) {
    const errors = handleErrors(err);
    console.log({ errors });
    res.status(400).json({ errors, status: "error" });
  }
};

module.exports.forgot_password_post = async (req, res) => {
  const email = req.params.email;

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
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json({ message: "User logged out successfully." });
};

const sendSms = (user) => {
  client.messages
    .create({
      body: "Twillio sms Test : " + user.two_factor_auth_code,
      from: process.env.TWILIO_SENDER,
      to: process.env.TWILIO_RECEIVER,
    })
    .then((message) => console.log(message.sid, user));
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

// show all users
module.exports.show_users_get = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json({
      users,
      message: "All users retrieved successfully",
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to retrieve users",
      status: "error",
    });
  }
};
// Show Expert
module.exports.show_experts_get = async (req, res) => {
  try {
    const experts = await userModel.find({ role: 'Expert' });
    res.status(200).json({
      experts,
      message: "All experts retrieved successfully",
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to retrieve experts",
      status: "error",
    });
  }
};



//Get user by email
module.exports.get_user_by_email = async (req, res) => {
  const { email } = req.params;

  // check if user is authorized to access user information
  const userRole = req.user.role;
  if (
    userRole !== "admin" &&
    userRole !== "expert" &&
    userRole !== "client" &&
    userRole !== "agence"
  ) {
    return res.status(403).json({
      message: "You are not authorized to access this resource",
      status: "error",
    });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: "error",
      });
    }

    // check if user is authorized to access this user's information
    if (userRole === "Client" && user.id !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to access this resource",
        status: "error",
      });
    }
    if (userRole === "Agence" && user.agenceId !== req.user.agenceId) {
      return res.status(403).json({
        message: "You are not authorized to access this resource",
        status: "error",
      });
    }

    if (userRole === "Expert" && user.expertId !== req.user.expertId) {
      return res.status(403).json({
        message: "You are not authorized to access this resource",
        status: "error",
      });
    }

    // return user information if authorized
    return res.status(200).json({
      user,
      status: "success",
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while fetching user information",
      status: "error",
    });
  }
};

module.exports.get_user_by_email = async (req, res) => {
  const email = req.params.email;

  try {
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: "error",
      });
    }

    //TODO : fix
    delete user.password;
    console.log(user);
    res.status(200).json({
      user: user,
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
      status: "error",
    });
  }
};

module.exports.post_ban_user = async (req, res) => {
  try {
    const { mail } = req.params;
    const user = await userModel.findOne({ email: mail });

    if (!user) {
      throw Error("mail incorrect");
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      user._id,
      { banned: !user.banned },
      { new: true } // Returns the updated document
    );

    if (updatedUser.banned) {
      // send alert email
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_MARIEM,
          pass: process.env.PASS_MAIL_MARIEM,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_MARIEM,
        to: user.email,
        subject: "Ban Alert",
        html: `
        <!DOCTYPE html>
        <html>
        
        <head>
            <title></title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <style type="text/css">
                @media screen {
                    @font-face {
                        font-family: 'Lato';
                        font-style: normal;
                        font-weight: 400;
                    }
        
                    @font-face {
                        font-family: 'Lato';
                        font-style: normal;
                        font-weight: 700;
                    }
        
                    @font-face {
                        font-family: 'Lato';
                        font-style: italic;
                        font-weight: 400;
                    }
        
                    @font-face {
                        font-family: 'Lato';
                        font-style: italic;
                        font-weight: 700;
                    }
                }
        
                /* CLIENT-SPECIFIC STYLES */
                body,
                table,
                td,
                a {
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                }
        
                table,
                td {
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                }
        
                img {
                    -ms-interpolation-mode: bicubic;
                }
        
                /* RESET STYLES */
                img {
                    border: 0;
                    height: auto;
                    line-height: 100%;
                    outline: none;
                    text-decoration: none;
                }
        
                table {
                    border-collapse: collapse !important;
                }
        
                body {
                    height: 100% !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    width: 100% !important;
                }
        
                /* iOS BLUE LINKS */
                a[x-apple-data-detectors] {
                    color: inherit !important;
                    text-decoration: none !important;
                    font-size: inherit !important;
                    font-family: inherit !important;
                    font-weight: inherit !important;
                    line-height: inherit !important;
                }
        
                /* MOBILE STYLES */
                @media screen and (max-width:600px) {
                    h1 {
                        font-size: 32px !important;
                        line-height: 32px !important;
                    }
                }
        
                /* ANDROID CENTER FIX */
                div[style*="margin: 16px 0;"] {
                    margin: 0 !important;
                }
            </style>
        </head>
        
        <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
            <!-- HIDDEN PREHEADER TEXT -->
            <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account.
            </div>
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <!-- LOGO -->
                <tr>
                    <td bgcolor="#172b4d" align="center">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#172b4d" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                    <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Warning!</h1> <img src="cid:logo" width="125" height="120" style="display: block; border: 0px;" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">

                                    <p style="margin: 0;">
                                    We regret to inform you that your account has been banned due to violation of our terms and conditions.
                                     As a result, you will no longer be able to access our services.

                                    Please note that any attempt to create a new account will be blocked.
                                    

                                    
                                    Sincerely,</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                <table border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td align="center" style="border-radius: 3px;" bgcolor="#172b4d"><p  style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #172b4d; display: inline-block;">You are Banned</p></td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr> <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Sent By :<br>Assurini Team</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#F0FFFF" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p>
                                    If you believe that your account has been banned by mistake,
                                    Please contact our support team at :
                                    
                                    </p>
                                    <p style="margin: 0;"><a href="#" target="_blank" style="color: #172b4d;">assurini.tunisien0reply@gmail.com </a></p>
                                    <p>to discuss the matter.</p>
                                    <h2>Thank you for your understanding.</h2>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
                                    <p style="margin: 0;">If these emails get annoying, please feel free to <a href="#" target="_blank" style="color: #111111; font-weight: 700;">unsubscribe</a>.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        
        </html>
        `,
        attachments: [
          {
            filename: "logo.png",
            path: "./public/images/logo.png",
            cid: "logo",
          },
        ],
      };


      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      res.status(200).json({
        message: "Ban Alert",
        status: "success",
      });
    } else {

      res.status(200).json(updatedUser.banned);
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports.check_ban_user = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const isBanned = user.banned;

    res.status(200).json({ isBanned });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.post_update_user = async (req, res) => {
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

  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      throw Error("user not found ");
    }

    const newUser = { ...user._doc, ...req.body };

    console.log(newUser);

    await userModel.findByIdAndUpdate(newUser._id, newUser);

    res.status(201).json(true);
  } catch (error) {
    res.status(500).json(false);
  }
};

module.exports.get_get_email_from_token = async (req, res) => {
  console.log(req.params);
  const token = req.query.token;
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decodedToken);

  // find user by id and verificationToken
  const user = await userModel.findOne({
    _id: decodedToken.id,
    verificationToken: token,
  });

  res.status(201).json(user);
};
//By Id 

module.exports.get_userbyid = async (req, res) => {
  try {
    const _id = req.params.userId;
    const user = await userModel.findById(_id);

    if (!user) {
      throw new Error("User not found");
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
//get Agence By Email
module.exports.get_agence_by_email = async (req, res) => {
  const email = req.params.email;

  try {
    const agence = await userModel.findOne({ email: email, role: "Agence" });

    if (!agence) {
      return res.status(404).json({
        message: "Agence not found",
        status: "error",
      });
    }

    // remove sensitive information from the response
    delete agence.password;

    // return agence if found
    return res.status(200).json({
      agence: agence,
      status: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      status: "error",
    });
  }
};
// Get All Agence
module.exports.get_all_agences = async (req, res) => {
  try {
    const agences = await userModel.find({ role: "Agence" });

    // remove sensitive information from the response
    const sanitizedAgences = agences.map((agence) => {
      const { _id, first_name, email, phone, address, phone_number } = agence;
      return { _id, first_name, email, phone, address , phone_number};
    });

    // return agences if found
    return res.status(200).json({
      agences: sanitizedAgences,
      status: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      status: "error",
    });
  }
};

