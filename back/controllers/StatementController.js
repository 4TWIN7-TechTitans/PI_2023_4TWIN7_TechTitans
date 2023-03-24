const StatementModel = require("../models/statement");
require("dotenv").config();

module.exports.add_statement_post = async (req, res) => {
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
      res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  };

