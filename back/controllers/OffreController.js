const OffreModel = require("../models/offre");

module.exports.add_offre = async (req, res) => {
  try {
    const offre = await OffreModel.create({
      ...req.body,
    });
    res.status(201).json({ message: "Offre created successfully", offre });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Offre with this site already exists" });
    } else {
      res.status(400).json({ message: "Error creating offre", error });
    }
  }
};
