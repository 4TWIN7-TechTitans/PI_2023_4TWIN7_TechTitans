const ticketModel = require("../models/ticket");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports.add_ticket = async (req, res) => {

  
  try {
    const last_ticket = await ticketModel.find().sort( { _id : -1 } ).limit(1);
   if(last_ticket.length>0)
   {
    const ticketnumber=Number(last_ticket[0].number) + 1;
    console.log(ticketnumber);
    req.body.number=ticketnumber;
   }
   else
   req.body.number=1;
     
    const ticket = await ticketModel.create({...req.body,
    });


    // send password reset email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_MARIEM,
        pass: process.env.PASS_MAIL_MARIEM,
      },
    });

    const mailOptions = {
      from: "mahmoud.cheikh@esprit.tn",
      to: "mariem.nacib@esprit.tn",
      subject: "A new ticket has been added !",
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
                                  Dear Client ,<br>
                                 a new ticket #${ticketnumber} was added please login to check in 
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
    res.status(201).json({ message: "ticket created successfully", ticket });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

//get all tickets
module.exports.get_tickets = async (req, res) => {
    try {
      const tickets = await ticketModel.find({});
      res.status(200).json({
        tickets,
        message: "All tickets retrieved successfully",
        status: "success",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Failed to retrieve tickets",
        status: "error",
      });
    }
  };



  module.exports.get_ticketsbyagence = async (req, res) => {
    const { id } = req.body;
    try {
      const ticket = await ticketModel.find( {id_agence : id}   );
      if (ticket) 
      res.status(200).json({ ticket: ticket});
      
    } catch (err) {
     
      
      res.status(400).json({ err, status: "error" });
    }
  };



  module.exports.get_ticketsbyclient = async (req, res) => {
    const { id } = req.body;
    try {
      const ticket = await  ticketModel.find( {id_demandeur : id}   );
      if (ticket) 
      res.status(200).json({ ticket: ticket});
      
    } catch (err) {
     
      
      res.status(400).json({ err, status: "error" });
    }
  };





  module.exports.get_ticket = async (req, res) => {
    const { id } = req.body;
   
    try {
      const ticket = await ticketModel.find( {number : id}   );
      if (ticket) 
      {
        console.log(ticket)
        res.status(200).json({ ticket: ticket});
      }
    
      
    } catch (err) {
     
      const errorp=err.message;
      res.status(400).json({ errorp, status: "error" });
    }
  };




  module.exports.update_ticket = async (req, res) => {
    const ticket=req.body;
   
   try {
       
    const updateticket = await ticketModel.findByIdAndUpdate(
      ticket._id,
      { log: ticket.log,
      etat:ticket.etat },
      { new: true } // Returns the updated document
    );
    res.status(200).json({ });
    
      
    } catch (err) {
     
      const errorp=err.message;
      res.status(400).json({ errorp, status: "error" });
    }

   
  };
 
  module.exports.get_ticket_by_obj = async (req, res) => {
    const { objet } = req.body;
  
    try {
      const ticket = await ticketModel.findOne({ objet });
      if (ticket) {
        console.log(ticket);
        res.status(200).json({ ticket });
      } else {
        res.status(404).json({ message: "Ticket not found" });
      }
    } catch (err) {
      const errorp = err.message;
      res.status(400).json({ errorp, status: "error" });
    }
  };
  