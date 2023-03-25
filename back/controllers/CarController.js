const CarModel = require("../models/car");
const ContractModel = require("../models/contract");
require("dotenv").config();

const handleErrors = (err) => {
  let errors = {
    brand: "",
    model: "",
    type: "",
    registration_number: "",
    id_contrat: "",
  };

  if (err.message.includes("Car validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  if (err.message.includes("Cast to ObjectId failed for value")) {
    errors["id_contrat"] = "Invalid contract ID";
  }

  return errors;
};

const carExists = async (registrationNumber) => {
    const car = await CarModel.findOne({ registration_number: registrationNumber });
    return car !== null;
  }; 

module.exports.post_car = async (req, res) => {
  /* #swagger.parameters['parameter_name'] = {
        in: 'body',
        schema: {
          "id": 1,
          "brand": "Toyota",
          "model": "Camry",
          "type": "Sedan",
          "registration_number": "ABC-1234",
          "id_contrat": "61597a53c4de4d4f9c153091" 
        }
      }
    */
  try {
  const registrationNumber = req.body.registration_number;
  const exists = await carExists(registrationNumber);
  if (exists) {
    return res.status(409).json({
      message: `Car with registration number ${registrationNumber} already exists`,
      status: "error",
    });
  }
  const car = await CarModel.create(req.body);
  res.status(201).json({
    car_created: car.id,
    message: "Your Car added, Success",
    status: "success",
  });
} catch (err) {
  const errors = handleErrors(err);
  console.log({ errors });
  res.status(400).json({ errors, status: "error" });

}
}