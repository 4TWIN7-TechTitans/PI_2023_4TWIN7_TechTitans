const StatementModel = require("../models/statement");
const UserModel = require("../models/user");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

// configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  folder: process.env.FOLDER,
  folder: process.env.FOLDER1,
  format: process.env.FORMAT,
  Upload_presets: process.env.UPLOAD_PRESTE_croquis,
  Upload_presets: process.env.UPLOAD_PRESTE_signatures_a,
  Upload_presets: process.env.UPLOAD_PRESTE_signatures_b,
});

module.exports.add_statement_post = async (req, res) => {
  try {

    const statement = await StatementModel.create({
      ...req.body,
    });

    res.status(201).json({
      message: "Statement created successfully",
      statement,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Duplicate key error" });
    } else {
      res.status(400).json({ message: "Error creating statement", error });
    }
  }
};

module.exports.check_statement = async (req, res) => {
  try {
    const statement = await StatementModel.findOne({
      image_pdf: req.params.image_pdf,
    });
    if (statement) {
      res.status(200).json({ message: "statement exists" });
    } else {
      res.status(404).json({ message: "statement does not exist" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports.assign_statement_post = async (req, res) => {
  try {
    // Find expert by email
    const expert = await UserModel.findOne({ email: req.body.email });
    if (!expert) {
      return res.status(404).json({ message: "Expert not found" });
    }
    if (!expert.statements_number) {
      expert.statements_number = 0;
    }
    expert.statements_number += 1;
    await UserModel.findByIdAndUpdate(expert._id, expert);
    // Assign statement to expert
    const statement = await StatementModel.findOneAndUpdate(
      { _id: req.params.id },
      { assign_to_expert: expert._id },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Statement updated successfully", statement });
  } catch (error) {
    res.status(400).json({ message: "Error updating statement", error });
  }
};

module.exports.get_all_statements = async (req, res) => {
  try {
    const statements = await StatementModel.find();
    if (statements.length === 0) {
      res.status(404).json({ message: "No statements found" });
    } else {
      res.status(200).json({ statements });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving statements", error });
  }
};

module.exports.create_or_update_statement_post = async (req, res) => {
  try {
    const statement = await StatementModel.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { upsert: true, new: true }
    );
    res.status(201).json({
      message: "Statement created or updated successfully",
      statement,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create or update statement", error });
  }
};

module.exports.getStatementByExpertEmail = async function (req, res) {
  try {
    const expert = await UserModel.findOne({ email: req.params.email });
    if (!expert) {
      return res.status(404).json({ message: "Expert not found" });
    }

    const statements = await StatementModel.find({
      assign_to_expert: expert._id,
    });
    res
      .status(200)
      .json({ message: "Statements retrieved successfully", statements });
  } catch (error) {
    console.error(`Error getting statement: ${error}`);
    res
      .status(500)
      .json({ message: `Error getting statement: ${error.message}` });
  }
};


module.exports.get_statement_by_id = async (req, res) => {
  try {
    const statement = await StatementModel.findById(req.params.id); 
    if (!statement) {
      res.status(404).json({ message: "Statement not found" });
    } else {
      res.status(200).json({ statement });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving statement", error });
  }
};
module.exports.post_decision = async (req, res) => {
  const { statementId, decision } = req.body;
  try {
    const statement = await StatementModel.findById(statementId);
    if (!statement) {
      return res.status(404).json({ message: "Statement not found" });
    }
    statement.decision = decision;
    statement.case_state = "treated";
    console.log(statement);
    const result = await StatementModel.findByIdAndUpdate(
      statement._id,
      statement
    );
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Error setting decision", error });
  }
};

module.exports.update_statement_status = async (req, res) => {
  const statementId = req.params.id;
  const { case_state } = req.body;

  try {
    const statement = await StatementModel.findByIdAndUpdate(
      statementId,
      { case_state },
      { new: true }
    );
    if (!statement) {
      return res.status(404).json({ message: "Statement not found" });
    }
    res.status(200).json({ statement });
  } catch (error) {
    res.status(500).json({ message: "Error updating statement status", error });
  }
};

// Filter status statement 
module.exports.filtre_statements = async (req, res) => {
  try {
    const { case_state } = req.params;
    let statements;
    if (case_state) {
      switch (case_state) {
        case "waiting":
        case "treated":
        case "inProgress":
        case "closed":
          statements = await StatementModel.find({ case_state });
          break;
        default:
          res.status(400).json({
            message: "Invalid case state parameter",
            status: "error",
          });
          return;
      }
    } else {
      statements = await StatementModel.find({});
    }
    res.status(200).json({
      statements,
      message: "Statements retrieved successfully",
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to retrieve statements",
      status: "error",
    });
  }
};

module.exports.add_comment_to_statement = async (req, res) => {
  try {
    const statementId = req.params.id;
    const { commentaire } = req.body; 

    const statement = await StatementModel.findByIdAndUpdate(statementId ,{commentaire},{new : true}); 
            
    if (!statement) { 
      res.status(404).json({ message: "Statement not found" });
      return;
    }

    

    res.status(200).json({
      message: "Comment added to statement successfully",
      statement,
    });
  } catch (error) {
    res.status(400).json({ message: "Error adding comment to statement", error });
  }
};

module.exports.remove_comment_from_statement = async (req, res) => {
  try {
    const statementId = req.params.id;
    const statement = await StatementModel.findByIdAndUpdate(statementId, { commentaire: "" }, { new: true });

    if (!statement) {
      res.status(404).json({ message: "Statement not found" });
      return;
    }

    res.status(200).json({
      message: "Comment removed from statement successfully",
      statement,
    });
  } catch (error) {
    res.status(400).json({ message: "Error removing comment from statement", error });
  }
};

// generate Statement
/*
module.exports.gen_statement_post = async (req, res) => {
  try {
    const statements = await StatementModel.insertMany(req.body);

    res.status(201).json({
      message: `${statements.length} statements created successfully`,
      statements,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Duplicate key error" });
    } else {
      res.status(400).json({ message: "Error creating statements", error });
    }
  }
};
*/
module.exports.gen_statement_post = async (req, res) => {
  try {
    const statements = [];
    for (let i = 0; i < 10; i++) {
      const statement = await StatementModel.create({
        ...req.body,
      });
      statements.push(statement);
    }
    res.status(201).json({
      message: "Statements created successfully",
      statements,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Duplicate key error" });
    } else {
      res.status(400).json({ message: "Error creating statements", error });
    }
  }
};

const fs = require("fs");
const { PDFDocument, rgb , StandardFonts } = require("pdf-lib");

const gen_pdf = async (statement) => {
  const {

    date,
    lieu,
    blesseTF,
    degatsTF,
    temoins,

    assureparA,
    policeA,
    agenceA,
    duA,
    auA,
    cnomA,
    cprenomA,
    cadresseA,
    cpermisA,
    cdelivreA,
    nomAssureA,
    prenomAssureA,
    adresseAssureA,
    telAssureA,
    marqueA,
    immA,
    venantdeA,
    allantAA,

    assuranceB,
    policeB,
    agenceB,
    duB,
    auB,
    cnomB,
    cprenomB,
    cadresseB,
    cpermisB,
    cdelivereB,
    nomAssureB,
    prenomAssureB,
    adresseAssureB,
    telAssureB,
    marqueB,
    immB,
    venantdeB,
    allantAB,

  } = statement;

  const existingPdfBytes = await fs.promises.readFile("constat.pdf");
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const page = pdfDoc.getPages()[0];
  const { width, height } = page.getSize();
  const fontSize = 8;
  const text = "Hello, World!";
  const textWidth = font.widthOfTextAtSize(text, fontSize);
  page.drawText(date, { x: 36, y:  height - 90 , size: fontSize, color: rgb(0, 0, 0),}); //date
  // page.drawText(lieu, { x: 174, y:  height - 90 , size: fontSize, color: rgb(0, 0, 0),}); //lieu
  if(blesseTF == "yes"){
    page.drawText("x", { x: 550, y:  height - 100 , size: fontSize, color: rgb(0, 0, 0),}); //blesse oui
  } else {
    page.drawText("x", { x: 475, y:  height - 100 , size: fontSize, color: rgb(0, 0, 0),}); //blesse non
  }
  if(degatsTF =="Yes"){
  page.drawText("x", { x: 147, y:  height - 133 , size: fontSize, color: rgb(0, 0, 0),}); //degats oui
  } else {
    page.drawText("x", { x: 70, y:  height - 131 , size: fontSize, color: rgb(0, 0, 0),}); // degat non
  }
  page.drawText(temoins, { x: 188, y:  height - 123 , size: fontSize, color: rgb(0, 0, 0),}); //temoins
  page.drawText(assureparA, { x: 118, y:  height - 183 , size: fontSize, color: rgb(0, 0, 0),}); //assuré par
  page.drawText(policeA, { x: 129, y:  height - 204 , size: fontSize, color: rgb(0, 0, 0),}); //assurance
  page.drawText(agenceA, { x: 63, y:  height - 220 , size: fontSize, color: rgb(0, 0, 0),}); //agence
  page.drawText(duA, { x: 49, y:  height - 256 , size: fontSize, color: rgb(0, 0, 0),}); //du
  page.drawText(auA, { x: 137, y:  height - 256 , size: fontSize, color: rgb(0, 0, 0),}); //au
  page.drawText(cnomA, { x: 59, y:  height - 289 , size: fontSize, color: rgb(0, 0, 0),}); //nom
  page.drawText(cprenomA, { x: 68, y:  height - 303 , size: fontSize, color: rgb(0, 0, 0),}); //prenom
  page.drawText(cadresseA, { x: 71, y:  height - 325 , size: fontSize, color: rgb(0, 0, 0),}); //adresse
 // page.drawText(cpermisA, { x: 138, y:  height - 341 , size: fontSize, color: rgb(0, 0, 0),}); //permis
  page.drawText(cdelivreA, { x: 87, y:  height - 357 , size: fontSize, color: rgb(0, 0, 0),}); //delivre
  page.drawText(nomAssureA, { x: 59, y:  height - 389 , size: fontSize, color: rgb(0, 0, 0),}); //assuré
  page.drawText(prenomAssureA, { x: 68, y:  height - 405 , size: fontSize, color: rgb(0, 0, 0),}); //prenom
  page.drawText(adresseAssureA, { x: 77, y:  height - 420 , size: fontSize, color: rgb(0, 0, 0),}); //adresse
  page.drawText(telAssureA, { x: 162, y:  height - 438 , size: fontSize, color: rgb(0, 0, 0),}); //tel
  page.drawText(marqueA, { x: 97, y:  height - 475 , size: fontSize, color: rgb(0, 0, 0),}); //marque
  page.drawText(immA, { x: 120, y:  height - 490 , size: fontSize, color: rgb(0, 0, 0),}); //imm
  page.drawText(venantdeA, { x: 80, y:  height - 525 , size: fontSize, color: rgb(0, 0, 0),}); //de
  page.drawText(allantAA, { x: 71, y:  height - 545 , size: fontSize, color: rgb(0, 0, 0),}); //allant
  //-------------- VEH B
  page.drawText(assuranceB, { x: 480, y:  height - 185 , size: fontSize, color: rgb(0, 0, 0),}); //assurance
  page.drawText(policeB, { x: 485, y:  height - 201 , size: fontSize, color: rgb(0, 0, 0),}); //police
  page.drawText(agenceB, { x: 423, y:  height - 220 , size: fontSize, color: rgb(0, 0, 0),}); //agence
  page.drawText(duB, { x: 423, y:  height - 256 , size: fontSize, color: rgb(0, 0, 0),}); //du
  page.drawText(auB, { x: 515, y:  height - 257 , size: fontSize, color: rgb(0, 0, 0),}); //au
  page.drawText(cnomB, { x: 438, y:  height - 287 , size: fontSize, color: rgb(0, 0, 0),}); //nom
  page.drawText(cprenomB, { x: 447, y:  height - 305 , size: fontSize, color: rgb(0, 0, 0),}); //prenom
  page.drawText(cadresseB, { x: 449, y:  height - 323 , size: fontSize, color: rgb(0, 0, 0),}); //adrese
  //page.drawText(cpermisB, { x: 519, y:  height - 342 , size: fontSize, color: rgb(0, 0, 0),}); //permis
  page.drawText(cdelivereB, { x: 455, y:  height - 355 , size: fontSize, color: rgb(0, 0, 0),}); //delivere
  page.drawText(nomAssureB, { x: 439, y:  height - 392 , size: fontSize, color: rgb(0, 0, 0),}); //nom
  page.drawText(prenomAssureB, { x: 449, y:  height - 407 , size: fontSize, color: rgb(0, 0, 0),}); //prenom
  page.drawText(adresseAssureB, { x: 454, y:  height - 422 , size: fontSize, color: rgb(0, 0, 0),}); //addr
  page.drawText(telAssureB, { x: 530, y:  height - 440 , size: fontSize, color: rgb(0, 0, 0),}); //tel
  page.drawText(marqueB, { x: 476, y:  height - 478 , size: fontSize, color: rgb(0, 0, 0),}); //marque
  page.drawText(immB, { x: 497, y:  height - 490 , size: fontSize, color: rgb(0, 0, 0),}); //imm
  page.drawText(venantdeB, { x: 459, y:  height - 528 , size: fontSize, color: rgb(0, 0, 0),}); //vevant
  page.drawText(allantAB, { x: 452, y:  height - 545 , size: fontSize, color: rgb(0, 0, 0),}); //allant

  // page.drawText("x", { x: 220, y:  height - 200 , size: fontSize, color: rgb(0, 0, 0),}); //1A
  // page.drawText("x", { x: 220, y:  height - 222 , size: fontSize, color: rgb(0, 0, 0),}); //2A
  // page.drawText("x", { x: 220, y:  height - 241 , size: fontSize, color: rgb(0, 0, 0),}); //3A
  // page.drawText("x", { x: 220, y:  height - 260 , size: fontSize, color: rgb(0, 0, 0),}); //4A
  // page.drawText("x", { x: 220, y:  height - 285 , size: fontSize, color: rgb(0, 0, 0),}); //5A
  // page.drawText("x", { x: 220, y:  height - 305 , size: fontSize, color: rgb(0, 0, 0),}); //6A
  // page.drawText("x", { x: 220, y:  height - 325 , size: fontSize, color: rgb(0, 0, 0),}); //7A
  // page.drawText("x", { x: 220, y:  height - 345 , size: fontSize, color: rgb(0, 0, 0),}); //8A
  // page.drawText("x", { x: 220, y:  height - 365 , size: fontSize, color: rgb(0, 0, 0),}); //9A
  // page.drawText("x", { x: 220, y:  height - 385 , size: fontSize, color: rgb(0, 0, 0),}); //10A
  // page.drawText("x", { x: 220, y:  height - 405 , size: fontSize, color: rgb(0, 0, 0),}); //11A
  // page.drawText("x", { x: 220, y:  height - 425 , size: fontSize, color: rgb(0, 0, 0),}); //12A
  // page.drawText("x", { x: 220, y:  height - 445 , size: fontSize, color: rgb(0, 0, 0),}); //13A
  // page.drawText("x", { x: 220, y:  height - 465 , size: fontSize, color: rgb(0, 0, 0),}); //14A
  // page.drawText("x", { x: 220, y:  height - 485 , size: fontSize, color: rgb(0, 0, 0),}); //15A
  // page.drawText("x", { x: 220, y:  height - 505 , size: fontSize, color: rgb(0, 0, 0),}); //16A
  // page.drawText("x", { x: 220, y:  height - 525 , size: fontSize, color: rgb(0, 0, 0),}); //17A
  
  // page.drawText("x", { x: 380, y:  height - 200 , size: fontSize, color: rgb(0, 0, 0),}); //1B
  // page.drawText("x", { x: 380, y:  height - 222 , size: fontSize, color: rgb(0, 0, 0),}); //2B
  // page.drawText("x", { x: 380, y:  height - 241 , size: fontSize, color: rgb(0, 0, 0),}); //3B
  // page.drawText("x", { x: 380, y:  height - 260 , size: fontSize, color: rgb(0, 0, 0),}); //4B
  // page.drawText("x", { x: 380, y:  height - 285 , size: fontSize, color: rgb(0, 0, 0),}); //5B
  // page.drawText("x", { x: 380, y:  height - 305 , size: fontSize, color: rgb(0, 0, 0),}); //6B
  // page.drawText("x", { x: 380, y:  height - 325 , size: fontSize, color: rgb(0, 0, 0),}); //7B
  // page.drawText("x", { x: 380, y:  height - 345 , size: fontSize, color: rgb(0, 0, 0),}); //8B
  // page.drawText("x", { x: 380, y:  height - 365 , size: fontSize, color: rgb(0, 0, 0),}); //9B
  // page.drawText("x", { x: 380, y:  height - 385 , size: fontSize, color: rgb(0, 0, 0),}); //10B
  // page.drawText("x", { x: 380, y:  height - 405 , size: fontSize, color: rgb(0, 0, 0),}); //11B
  // page.drawText("x", { x: 380, y:  height - 425 , size: fontSize, color: rgb(0, 0, 0),}); //12B
  // page.drawText("x", { x: 380, y:  height - 445 , size: fontSize, color: rgb(0, 0, 0),}); //13B
  // page.drawText("x", { x: 380, y:  height - 465 , size: fontSize, color: rgb(0, 0, 0),}); //14B
  // page.drawText("x", { x: 380, y:  height - 485 , size: fontSize, color: rgb(0, 0, 0),}); //15B
  // page.drawText("x", { x: 380, y:  height - 505 , size: fontSize, color: rgb(0, 0, 0),}); //16B
  // page.drawText("x", { x: 380, y:  height - 525 , size: fontSize, color: rgb(0, 0, 0),}); //17B


 
  

  const pdfBytes = await pdfDoc.save();
  await fs.promises.writeFile("new.pdf", pdfBytes);
  return true;
};

module.exports.get_statement_by_location = async (req, res) => {
  try {
    const location = req.params.location;
    const statement = await StatementModel.findOne({ location }); 
    if (!statement) {
      res.status(404).json({ message: "Statement not found" });
    } else {
      res.status(200).json({ statement });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving statement", error });
  }
  return true;
};


// userController = require("./userController");
const userController = require("./userController.js");
module.exports.genPDFfromStatementId = async (req, res) => {
  const {idStatement} = req.body;
  const statement = await StatementModel.findById(idStatement); 
    if (!statement) {
      res.status(404).json({ message: "Statement not found" });
    } else {
      statementgen = {};
      agence = await userController.get_userbyidstatic(statement.vehicule_a.agency.toString());
      console.log(agence)
      statementgen.date = statement.date.toISOString().substring(0, 10).replace(/-/g, '/');;
statementgen.lieu = statement.location.toString();
statementgen.blesseTF = statement.injured.toString();
statementgen.degatsTF = statement.material_damage.toString();
statementgen.temoins = statement.witness_a + statement.witness_b.toString();
statementgen.assureparA = agence.first_name;
statementgen.policeA = statement.vehicule_a.contractNumber.toString();
statementgen.agenceA = agence.first_name;
statementgen.duA = statement.vehicule_a.contractValidity.start_date.toISOString().substring(0, 10).replace(/-/g, '/');;
statementgen.auA = statement.vehicule_a.contractValidity.end_date.toISOString().substring(0, 10).replace(/-/g, '/');;
statementgen.cnomA = statement.drivers_identity_a.first_name.toString();
statementgen.cprenomA = statement.drivers_identity_a.last_name.toString();
statementgen.cadresseA = statement.drivers_identity_a.address.toString();
statementgen.cdelivreA = statement.drivers_identity_a.drivers_license_issue_date.toISOString().substring(0, 10).replace(/-/g, '/');;
statementgen.nomAssureA = statement.insured_a.firstname.toString();
statementgen.prenomAssureA = statement.insured_a.lastname.toString();
statementgen.telAssureA = statement.insured_a.phonenumber.toString();
statementgen.adresseAssureA= statement.insured_a.addr.toString();
statementgen.marqueA = statement.vehicule_identity_a.brand //+ statement.vehicule_identity_a.type.toString();
statementgen.immA = statement.vehicule_identity_a.matriculation.toString();
statementgen.venantdeA = statement.vehicule_identity_a.coming_from.toString();
statementgen.allantAA = statement.vehicule_identity_a.going_to.toString();
statementgen.assuranceB = statement.vehicule_b.assureBy.toString();
statementgen.policeB = statement.vehicule_b.contractNumber.toString();
statementgen.agenceB = statement.vehicule_b.agency.toString();
statementgen.duB = statement.vehicule_b.contractValidity.start_date.toISOString().substring(0, 10).replace(/-/g, '/');;
statementgen.auB = statement.vehicule_b.contractValidity.end_date.toISOString().substring(0, 10).replace(/-/g, '/');;
statementgen.cnomB = statement.drivers_identity_b.first_name.toString();
statementgen.cprenomB = statement.drivers_identity_b.last_name.toString();
statementgen.cadresseB = statement.drivers_identity_b.address.toString();
statementgen.cdelivereB = statement.drivers_identity_b.drivers_license_issue_date.toISOString().substring(0, 10).replace(/-/g, '/');;
statementgen.nomAssureB = statement.insured_b.firstname.toString();
statementgen.prenomAssureB = statement.insured_b.lastname.toString();
statementgen.adresseAssureB = statement.insured_b.addr.toString();
statementgen.telAssureB = statement.insured_b.phonenumber.toString();
statementgen.marqueB = statement.vehicule_identity_b.brand //+ statement.vehicule_identity_b.type.toString();
statementgen.immB = statement.vehicule_identity_b.matriculation.toString();
statementgen.venantdeB = statement.vehicule_identity_b.coming_from.toString();
statementgen.allantAB = statement.vehicule_identity_b.going_to.toString();
      gen_pdf(statementgen);
      res.status(200).json(idStatement);
    }


  
};


module.exports.dlPDF = async (req, res) => {
  const filePath = "C:/repos/PI_2023_4TWIN7_TechTitans/back/new.pdf"
  // res.sendFile(filePath);
  // const filePath = 'C:/repos/PI_2023_4TWIN7_TechTitans/back/new.pdf';
  // const fileName = path.basename(filePath);
  // const fileStream = fs.createReadStream(filePath);

  // res.setHeader('Content-Disposition', `attachment; filename=new.pdf`);
  // res.setHeader('Content-Type', 'application/pdf');

  // fileStream.pipe(res);

  const fileStream = fs.createReadStream(filePath, { highWaterMark: 512 * 512 });

  res.setHeader('Content-Disposition', `attachment; filename=new.pdf`);
  // res.setHeader('Content-Type', 'application/pdf');

  fileStream.on('error', (err) => {
    res.status(500).send(err);
  });

  fileStream.on('end', () => {
    res.end();
  });

  fileStream.pipe(res);
}
