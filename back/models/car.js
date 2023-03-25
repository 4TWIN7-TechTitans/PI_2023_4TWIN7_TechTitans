const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  brand: {
    type: String,
    enum: ["Toyota", "Honda", "Ford", "Chevrolet", "Nissan","Audi","Isuzu" , "BMW" , "Golf"
     ,"Tesla","Chevrolet" , "Hyundai" , "Infiniti" , "Volkswagen" , "Volvo" , "Alfa Romeo" 
     , "Mitsubishi"],
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  registration_number: {
    type: String,
    required: true,
  },
  id_contrat: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Contract",
  },
});

const Car = mongoose.model("Car", carSchema);
module.exports = Car;
