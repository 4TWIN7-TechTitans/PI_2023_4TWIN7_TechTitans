const StatementModel = require("../models/statement");
const UserModel = require("../models/user");
const OffreModel = require("../models/offre");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const natural = require('natural');

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

    const statement = await StatementModel.findByIdAndUpdate(statementId, { commentaire }, { new: true });

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
module.exports.get_comments_for_statement = async (req, res) => {
  try {
    const statementId = req.params.id;

    const statement = await StatementModel.findById(statementId);
    
    if (!statement) {
      res.status(404).json({ message: "Statement not found" });
      return;
    }

    const comments = statement.commentaire;

    res.status(200).json({
      message: "Comments retrieved successfully",
      comments,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error retrieving comments for statement", error });
  }
};

module.exports.get_comment_in_statement = async (req, res) => {
  try {
    const statementId = req.params.id;

    const statement = await StatementModel.findById(statementId);

    if (!statement) {
      res.status(404).json({ message: "Statement not found" });
      return;
    }

    const commentaire = statement.commentaire;

    if (!commentaire) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }

    res.status(200).json({
      message: "Comment retrieved successfully",
      commentaire,
    });
  } catch (error) {
    res.status(400).json({ message: "Error retrieving comment", error });
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

const { PDFDocument, rgb , StandardFonts } = require("pdf-lib");

//AI 

// const natural = require('natural');
const mongoose = require('mongoose');
// const { OffreModel } = require('./models/offre');

// Entraînement du modèle de recommandation et stockage dans la base de données
module.exports.train_offer = async (req, res) => {
  try {
    const offers = await OffreModel.find().select('site');
    const corpus = offers.map((offer) => {
      const site = offer.site.toLowerCase();
      const domain = site.match(/(?:www\.)?([\w-]+)\.\w{2,}/)[1];
      const text = `${domain}`;
      return text;      
    });
    const tfidf = new natural.TfIdf();
    corpus.forEach((doc) => {
      tfidf.addDocument(doc);
    });
    const model = {}; 
    offers.forEach((offer, index) => {
      const tfidfScores = {};
      tfidf.listTerms(index).forEach((term) => {
        tfidfScores[term.term] = term.tfidf;
      });
      const site = offer.site.toLowerCase();
      const domain = site.match(/(?:www\.)?([\w-]+)\.\w{2,}/)[1];
      model[domain] = tfidfScores;
    });

    // Enregistrement du modèle dans la base de données
    const RecommendationOffers = mongoose.model('RecommendationOffers', new mongoose.Schema({
      model: Object,
    }));

    const recommendationModel = new RecommendationOffers({ model });
    await recommendationModel.save();
    res.status(200).json({ message: 'Le modèle de recommandation a été entraîné et enregistré avec succès.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//get train offer
module.exports.get_train_offer = async (req, res) => {
  try {
    const RecommendationOffers = mongoose.model('RecommendationOffers');
    const modelDoc = await RecommendationOffers.findOne();
    const model = modelDoc.model;
    
    // Get the best scored offer
    const sites = Object.keys(model);
    let bestSite = null;
    let bestScore = -Infinity;
    sites.forEach((site) => {
      const tfidfScores = model[site];
      const score = Object.values(tfidfScores).reduce((acc, cur) => acc + cur, 0);
      if (score > bestScore) {
        bestSite = site;
        bestScore = score;
      }
    });
    bestSite = bestSite.replace('_', '.'); 
    
    console.log(bestSite);
    res.status(200).json({ bestSite, model });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



module.exports.dlPDF = async (req, res) => {
  const filePath = "C:/repos/PI_2023_4TWIN7_TechTitans/back/new.pdf";
  // res.sendFile(filePath);
  // const filePath = 'C:/repos/PI_2023_4TWIN7_TechTitans/back/new.pdf';
  // const fileName = path.basename(filePath);
  // const fileStream = fs.createReadStream(filePath);

  // res.setHeader('Content-Disposition', `attachment; filename=new.pdf`);
  // res.setHeader('Content-Type', 'application/pdf');

  // fileStream.pipe(res);

  const fileStream = fs.createReadStream(filePath, {
    highWaterMark: 512 * 512,
  });

  res.setHeader("Content-Disposition", `attachment; filename=new.pdf`);
  // res.setHeader('Content-Type', 'application/pdf');

  fileStream.on("error", (err) => {
    res.status(500).send(err);
  });

  fileStream.on("end", () => {
    res.end();
  });

  fileStream.pipe(res);
};

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
  page.drawText(date, {
    x: 36,
    y: height - 90,
    size: fontSize,
    color: rgb(0, 0, 0),
  }); //date
  // page.drawText(lieu, { x: 174, y:  height - 90 , size: fontSize, color: rgb(0, 0, 0),}); //lieu
  if (blesseTF == "yes") {
    page.drawText("x", {
      x: 550,
      y: height - 100,
      size: fontSize,
      color: rgb(0, 0, 0),
    }); //blesse oui
  } else {
    page.drawText("x", {
      x: 475,
      y: height - 100,
      size: fontSize,
      color: rgb(0, 0, 0),
    }); //blesse non
  }
  if (degatsTF == "Yes") {
    page.drawText("x", {
      x: 147,
      y: height - 133,
      size: fontSize,
      color: rgb(0, 0, 0),
    }); //degats oui
  } else {
    page.drawText("x", {
      x: 70,
      y: height - 131,
      size: fontSize,
      color: rgb(0, 0, 0),
    }); // degat non
  }
  page.drawText(temoins, {
    x: 188,
    y: height - 123,
    size: fontSize,
    color: rgb(0, 0, 0),
  }); //temoins
  page.drawText(assureparA, {
    x: 118,
    y: height - 183,
    size: fontSize,
    color: rgb(0, 0, 0),
  }); //assuré par
  page.drawText(policeA, {
    x: 129,
    y: height - 204,
    size: fontSize,
    color: rgb(0, 0, 0),
  }); //assurance
  page.drawText(agenceA, {
    x: 63,
    y: height - 220,
    size: fontSize,
    color: rgb(0, 0, 0),
  }); //agence
  page.drawText(duA, {
    x: 49,
    y: height - 256,
    size: fontSize,
    color: rgb(0, 0, 0),
  }); //du
  page.drawText(auA, {
    x: 137,
    y: height - 256,
    size: fontSize,
    color: rgb(0, 0, 0),
  }); //au
  page.drawText(cnomA, {
    x: 59,
    y: height - 289,
    size: fontSize,
    color: rgb(0, 0, 0),
  }); //nom
  page.drawText(cprenomA, {
    x: 68,
    y: height - 303,
    size: fontSize,
    color: rgb(0, 0, 0),
  }); //prenom
  page.drawText(cadresseA, {
    x: 71,
    y: height - 325,
    size: fontSize,
    color: rgb(0, 0, 0),
  }); //adresse
  // page.drawText(cpermisA, { x: 138, y:  height - 341 , size: fontSize, color: rgb(0, 0, 0),}); //permis
  page.drawText(cdelivreA, {
    x: 87,
    y: height - 357,
    size: fontSize,
    color: rgb(0, 0, 0),
  }); //delivre
  page.drawText(nomAssureA, {
    x: 59,
    y: height - 389,
    size: fontSize,
    color: rgb(0, 0, 0),
  }); //assuré
  page.drawText(prenomAssureA, {
    x: 68,
    y: height - 405,
    size: fontSize,
    color: rgb(0, 0, 0),
  }); //prenom
  page.drawText(adresseAssureA, {
    x: 77,
    y: height - 420,
    size: fontSize,
    color: rgb(0, 0, 0),
  }); //adresse
  page.drawText(telAssureA, {
    x: 162,
    y: height - 438,
    size: fontSize,
    color: rgb(0, 0, 0),
  }); //tel
  page.drawText(marqueA, {
    x: 97,
    y: height - 475,
    size: fontSize,
    color: rgb(0, 0, 0),
  }); //marque
  page.drawText(immA, {
    x: 120,
    y: height - 490,
    size: fontSize,
    color: rgb(0, 0, 0),
  }); //imm
  page.drawText(venantdeA, {
    x: 80,
    y: height - 525,
    size: fontSize,
    color: rgb(0, 0, 0),
  }); //de
  page.drawText(allantAA, {
    x: 71,
    y: height - 545,
    size: fontSize,
    color: rgb(0, 0, 0),
  }); //allant
  //-------------- VEH B
  page.drawText(assuranceB, {
    x: 480,
    y: height - 185,
    size: fontSize,
    color: rgb(0, 0, 0),
  }); //assurance
  page.drawText(policeB, {
    x: 485,
    y: height - 201,
    size: fontSize,
    color: rgb(0, 0, 0),
  }); //police
  page.drawText(agenceB, {
    x: 423,
    y: height - 220,
    size: fontSize,
    color: rgb(0, 0, 0),
  }); //agence
  page.drawText(duB, {
    x: 423,
    y: height - 256,
    size: fontSize,
    color: rgb(0, 0, 0),
  }); //du
  page.drawText(auB, {
    x: 515,
    y: height - 257,
    size: fontSize,
    color: rgb(0, 0, 0),
  }); //au
  page.drawText(cnomB, {
    x: 438,
    y: height - 287,
    size: fontSize,
    color: rgb(0, 0, 0),
  }); //nom
  page.drawText(cprenomB, {
    x: 447,
    y: height - 305,
    size: fontSize,
    color: rgb(0, 0, 0),
  }); //prenom
  page.drawText(cadresseB, {
    x: 449,
    y: height - 323,
    size: fontSize,
    color: rgb(0, 0, 0),
  }); //adrese
  //page.drawText(cpermisB, { x: 519, y:  height - 342 , size: fontSize, color: rgb(0, 0, 0),}); //permis
  page.drawText(cdelivereB, {
    x: 455,
    y: height - 355,
    size: fontSize,
    color: rgb(0, 0, 0),
  }); //delivere
  page.drawText(nomAssureB, {
    x: 439,
    y: height - 392,
    size: fontSize,
    color: rgb(0, 0, 0),
  }); //nom
  page.drawText(prenomAssureB, {
    x: 449,
    y: height - 407,
    size: fontSize,
    color: rgb(0, 0, 0),
  }); //prenom
  page.drawText(adresseAssureB, {
    x: 454,
    y: height - 422,
    size: fontSize,
    color: rgb(0, 0, 0),
  }); //addr
  page.drawText(telAssureB, {
    x: 530,
    y: height - 440,
    size: fontSize,
    color: rgb(0, 0, 0),
  }); //tel
  page.drawText(marqueB, {
    x: 476,
    y: height - 478,
    size: fontSize,
    color: rgb(0, 0, 0),
  }); //marque
  page.drawText(immB, {
    x: 497,
    y: height - 490,
    size: fontSize,
    color: rgb(0, 0, 0),
  }); //imm
  page.drawText(venantdeB, {
    x: 459,
    y: height - 528,
    size: fontSize,
    color: rgb(0, 0, 0),
  }); //vevant
  page.drawText(allantAB, {
    x: 452,
    y: height - 545,
    size: fontSize,
    color: rgb(0, 0, 0),
  }); //allant


  const pdfBytes = await pdfDoc.save();
  await fs.promises.writeFile("new.pdf", pdfBytes);
  return true;
};


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

module.exports.get_statement_by_location = async (req, res) => {
  try {
    const location = req.query.location;
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


const csv = require("csv-parser");
const fs = require("fs");
const { promisify } = require("util");
const { PythonShell } = require("python-shell");
const csvtojson = require("csvtojson");
module.exports.predictDecision = async (req, res) => {


  async function trainModel(data) {
    // Load the Python script that trains the model
    const options = {
      pythonOptions: ["-u"], // Force Python
      scriptPath: "./scripts",
      args: ["-t", JSON.stringify(data)],
    };

    return new Promise((resolve, reject) => {
      PythonShell.run("train.py", options, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  async function predict(data) {
    // Load the Python script that makes predictions using the model
    const options = {
      pythonOptions: ["-u"], // Force Python
      scriptPath: "./scripts",
      args: ["-p", JSON.stringify(data)],
    };
    return new Promise((resolve, reject) => {
      PythonShell.run("predict.py", options, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(JSON.parse(results[0]));
        }
      });
    });
  }

  try {
    // Preprocess the data

    //const rawData = await preprocessData(path); // Train the model
    const model = await trainModel();
    console.log("path", path);
    // Make predictions
    const predictions = [];
    for (const item of req.body) {
      const result = await predict(item);
      predictions.push(result);
    }

    // Send the predictions
    res.json(predictions);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
};

const { spawn } = require('child_process');
module.exports.generateTrainData = async (req, res) => {
  try {
    const pythonProcess = spawn('python', ['C:/repos/PI_2023_4TWIN7_TechTitans/back/scripts/train.py']);

    pythonProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      if (code === 0) {
        res.status(200).json("Training completed successfully");
      } else {
        res.status(500).json("Training failed");
      }
    });

  } catch (e) {
    res.status(500).json("Error");
  }
};

module.exports.predict = async (req, res) => {
  const { statementId } = req.body;
  try {
    const statement = await StatementModel.findById(statementId);

    if (!statement) {
      console.log("error statement mafamech");
      throw new Error();
    }

    const pythonProcess = spawn('python', ['C:/repos/PI_2023_4TWIN7_TechTitans/back/scripts/predict.py']);
    let dataToSend = '';

    pythonProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
      dataToSend += data.toString();
      console.log(dataToSend);
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      if (code === 0) {
        console.log("dataToSend: ", dataToSend);
        const prediction = dataToSend.trim(); // Remove any leading/trailing whitespace
        const decision = prediction[0] === 'for a' ? "decision is for a" : "decision is for b";
     
        console.log(decision);
        res.status(200).json(decision);
      } else {
        res.status(500).json("Prediction failed");
      }
    });

  } catch (e) {
    res.status(500).json("Error");
  }
};



//profile insurable prediction

const tf = require('@tensorflow/tfjs');
module.exports.profile_prediction= async (req, res) => {
// Load the pre-trained model
async function loadModel() {

  const model = await tf.loadLayersModel('file://C:/repos/PI_2023_4TWIN7_TechTitans/users.json');
  return model;
}

// Define a function to preprocess the input
function preprocessInput(age, licenseDate, gender) {
  // Normalize the age and license date
  const normalizedAge = (age - 18) / (99 - 18);
  const normalizedLicenseDate = (new Date() - new Date(licenseDate)) / (1000 * 60 * 60 * 24 * 365.25);

  // Encode the gender as a one-hot vector
  const genderVector = gender === 'male' ? [1, 0] : [0, 1];

  // Combine the features into a single input tensor
  return tf.tensor2d([[normalizedAge, normalizedLicenseDate, ...genderVector]]);
}

// Make a prediction using the model
async function predict(model, inputTensor) {
  const outputTensor = model.predict(inputTensor);
  const outputArray = Array.from(outputTensor.dataSync());
  return outputArray[0];
}

// Load the model, preprocess input, and make a prediction
(async () => {
  try {
    // Load the model
    const model = await loadModel();
    console.log('Model loaded:', model);

    // Preprocess the input
    const age = 25;
    const licenseDate = '2015-01-01';
    const gender = 'male';
    const inputTensor = preprocessInput(age, licenseDate, gender);
    console.log('Input tensor:', inputTensor.toString());

    // Make a prediction
    const prediction = await predict(model, inputTensor);
    console.log('Prediction:', prediction);
  } catch (error) {
    console.error('Error:', error);
  }
})();
};




module.exports.get_most_accident_prone_locations = async (req, res) => {
  try {
    const statements = await StatementModel.find();
    if (statements.length === 0) {
      res.status(404).json({ message: "No statements found" });
    } else {
      const locations = statements.map(statement => statement.location);
      const frequencyMap = new Map();
      locations.forEach(location => {
        const count = frequencyMap.get(location) || 0;
        frequencyMap.set(location, count + 1);
      });
      const sortedLocations = [...frequencyMap.entries()].sort((a, b) => b[1] - a[1]);
      const result = {
        high_danger_zones: [],
        medium_danger_zones: [],
        less_danger_zones: []
      };
      sortedLocations.forEach(location => {
        const frequency = location[1];
        const coordinates = location[0];
        if (frequency >= 8) {
          result.high_danger_zones.push(coordinates);
        } else if (frequency >= 3) {
          result.medium_danger_zones.push(coordinates);
        } else {
          result.less_danger_zones.push(coordinates);
        }
      });
      const total = result.high_danger_zones.length + result.medium_danger_zones.length + result.less_danger_zones.length;
      const highDangerPercent = (result.high_danger_zones.length / total) * 100;
      const mediumDangerPercent = (result.medium_danger_zones.length / total) * 100;
      const lessDangerPercent = (result.less_danger_zones.length / total) * 100;
      res.status(200).json({ result, highDangerPercent, mediumDangerPercent, lessDangerPercent });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving statements", error });
  }
};


const PARTS_LIST = [
  "Front Left Fender",
  "Front Right Fender",
  "Rear Left Fender",
  "Rear Right Fender",
  "Front Bumper",
  "Rear Bumper",
  "Hood",
  "Trunk",
  "Roof",
  "Front Windshield",
  "Rear Windshield",
  "Side Mirror Left",
  "Side Mirror Right",
  "Door Front Left",
  "Door Front Right",
  "Door Rear Left",
  "Door Rear Right",
];

module.exports.fraud_detection_algorithme = async (req, res) => {
  try {
    const id = req.params.id;
    const statement = await StatementModel.findById(id);

    if (!statement) {
      res.status(404).json({ message: "Statement not found" });
      return;
    }

    const hits_a = statement.hits_a || [];
    const hits_b = statement.hits_b || [];

    // Initialize hitsByPart object with 0 hits for each part
    const hitsByPart = {};
    PARTS_LIST.forEach((part) => {
      hitsByPart[part] = 0;
    });

    // Count the hits for each part in hits_a
    hits_a.forEach((hit) => {
      const part = hit.split(" ")[0];
      hitsByPart[part]++;
    });

    // Count the hits for each part in hits_b
    hits_b.forEach((hit) => {
      const part = hit.split(" ")[0];
      hitsByPart[part]++;
    });

    // Determine if the statement is fraudulent based on the hits for each part
    let fraudLevel = "Low Fraud";

    PARTS_LIST.forEach((part) => {
      if (hitsByPart[part] > 5) {
        fraudLevel = "High Fraud";
      } else if (hitsByPart[part] > 0) {
        fraudLevel = "Medium Fraud";
      }
    });

    // Check for specific fraud patterns
    if (hits_a.includes("Roof") && hits_b.includes("Door Front Right")) {
      fraudLevel = "High Fraud";
    } else if (
      hits_a.includes("Door Front Left") &&
      hits_b.includes("Door Front Left")
    ) {
      fraudLevel = "High Fraud";
    } else if (
      hits_a.includes("Front Left Fender") &&
      hits_b.includes("Front Right Fender")
    ) {
      fraudLevel = "Low Fraud";
    } else if (
      hits_a.includes("Rear Left Fender") &&
      hits_b.includes("Rear Left Fender")
    ) {
      fraudLevel = "High Fraud";
    } else if (
      hits_a.includes("Rear Right Fender") &&
      hits_b.includes("Rear Right Fender")
    ) {
      fraudLevel = "High Fraud";
    } else if (
      hits_a.includes("Rear Left Fender") &&
      hits_b.includes("Rear Bumper")
    ) {
      fraudLevel = "High Fraud";
    } else if (
      hits_a.includes("Front Windshield") &&
      hits_b.includes("Side Mirror Right")
    ) {
      fraudLevel = "Meduim Fraud";
    } else if (
      hits_a.includes("Door Rear Right") &&
      hits_b.includes("Door Front Right")
    ) {
      fraudLevel = "High Fraud";
    } else if (hits_a.includes("Trunk") && hits_b.includes("Rear Windshield")) {
      fraudLevel = "High Fraud";
    } else if (
      hits_a.includes("Door Rear Right") &&
      hits_b.includes("Rear Door Rear Right")
    ) {
      fraudLevel = "High Fraud";
    } else if (hits_a.includes("Roof") && hits_b.includes("Door Front Left")) {
      fraudLevel = "Medium Fraud";
    } else if (
      hits_a.includes("Roof") &&
      hits_a.includes("Rear Windshield") &&
      hits_b.includes("Door Front Left") &&
      hits_b.includes("Door Front Right")
    ) {
      fraudLevel = "High Fraud";
    } else if (hits_a.includes("Trunk") && hits_b.includes("Door Front Left")) {
      fraudLevel = "High Fraud";
    } else if (
      hits_a.includes("Side Mirror Left") &&
      hits_b.includes("Side Mirror Left")
    ) {
      fraudLevel = "Meduim Fraud";
    } else if (
      hits_a.includes("Side Mirror Right") &&
      hits_b.includes("Side Mirror Right")
    ) {
      fraudLevel = "Meduim Fraud";
    } else if (
      hits_a.includes("Door Front Left") &&
      hits_a.includes("Side Mirror Left") &&
      hits_b.includes("Door Front Left") &&
      hits_b.includes("Side Mirror Left")
    ) {
      fraudLevel = "Meduim Fraud";
    } else if (
      hits_a.includes("Door Front Right") &&
      hits_a.includes("Side Mirror Right") &&
      hits_b.includes("Door Front Right") &&
      hits_b.includes("Side Mirror Right")
    ) {
      fraudLevel = "Meduim Fraud";
    } else if (
      hits_a.includes("Front Left Fender") &&
      hits_a.includes("Front Right Fender") &&
      hits_b.includes("Front Bumper") &&
      hits_b.includes("Rear Bumper") &&
      hits_b.includes("Hood")
    ) {
      fraudLevel = "Meduim Fraud";
    } else if (
      hits_a.includes("Front Left Fender") &&
      hits_a.includes("Front Right Fender") &&
      hits_a.includes("Rear Left Fender") &&
      hits_a.includes("Rear Right Fender") &&
      hits_a.includes("Front Bumper") &&
      hits_a.includes("Rear Bumper") &&
      hits_a.includes("Hood") &&
      hits_a.includes("Roof") &&
      hits_a.includes("Front Windshield") &&
      hits_a.includes("Rear Windshield") &&
      hits_a.includes("Side Mirror Left") &&
      hits_a.includes("Side Mirror Right") &&
      hits_a.includes("Door Front Right") &&
      hits_a.includes("Door Front Left") &&
      hits_a.includes("Door Rear Left") &&
      hits_a.includes("Door Rear Right") &&


      hits_b.includes("Front Left Fender") &&
      hits_b.includes("Front Right Fender") &&
      hits_b.includes("Rear Left Fender") &&
      hits_b.includes("Rear Right Fender") &&
      hits_b.includes("Front Bumper") &&
      hits_b.includes("Rear Bumper") &&
      hits_b.includes("Hood") &&
      hits_b.includes("Roof") &&
      hits_b.includes("Front Windshield") &&
      hits_b.includes("Rear Windshield") &&
      hits_b.includes("Side Mirror Left") &&
      hits_b.includes("Side Mirror Right") &&
      hits_b.includes("Door Front Right") &&
      hits_b .includes("Door Front Left") &&
      hits_b.includes("Door Rear Left") &&
      hits_b.includes("Door Rear Right") 
    ) {
      fraudLevel = "High Fraud";
    }


    await statement.save();

    // let fraudStatus = isFraudulent ? "High Fraud" : "Low Fraud";
    res
      .status(200)
      .json({
        fraudLevel: fraudLevel === "Meduim Fraud" ? "Meduim Fraud" : fraudLevel,
      });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving statement", error });
  }
};

//ai bonus malus vehicule :

module.exports.claim = async (req, res) => {
  try {
    const row = req.body;
    row=[0];
    const rowJson = JSON.stringify(row);

    const pythonProcess = spawn('python', ['C:/repos/PI_2023_4TWIN7_TechTitans/back/scripts/claimTrained.py', rowJson]);

    let stdout = '';
    let stderr = '';

    pythonProcess.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      stderr += data.toString();
    });
    console.log(data);
    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        console.error(`Python process exited with code ${code}`);
        return res.status(500).json({ error: 'Python script failed' });
      }
      const result = stdout.trim();
      console.log(result);
      res.status(200).json({ result });
    });

  } catch (e) {
    console.error(`Error: ${e.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports.predict_statement = async (req, res) => {
  console.log(req.body)
  const { make, fuel , airbags, transmission, camera,sensor,cyl,gear } =
    req.body;
    

  const csvdata =
    "policy_id,policy_tenure,age_of_car,age_of_policyholder,area_cluster,population_density,make,segment,model,fuel_type,max_torque,max_power,engine_type,airbags,is_esc,is_adjustable_steering,is_tpms,is_parking_sensors,is_parking_camera,rear_brakes_type,displacement,cylinder,transmission_type,gear_box,steering_type,turning_radius,length,width,height,gross_weight,is_front_fog_lights,is_rear_window_wiper,is_rear_window_washer,is_rear_window_defogger,is_brake_assist,is_power_door_locks,is_central_locking,is_power_steering,is_driver_seat_height_adjustable,is_day_night_rear_view_mirror,is_ecw,is_speed_alert,ncap_rating,is_claim\nID00001,0.515873589958172,0.05,0.644230769230769,C1,4990,"+make+",A,M1,"+fuel+",60Nm@3500rpm,40.36bhp@6000rpm,F8D Petrol Engine,"+airbags+",No,No,No,"+sensor+","+camera+",Drum,796,"+cyl+","+transmission+","+gear+",Power,4.6,3445,1515,1475,1185,No,No,No,No,No,No,No,Yes,No,No,No,Yes,0,0\n"
  try {
    fs.writeFile(
      "C:/repos/PI_2023_4TWIN7_TechTitans/back/scripts/unseulentree.csv",
      csvdata,
      function (err) {
        if (err) {
          console.error("Error writing CSV file:", err);
        } else {
          console.log("CSV file saved successfully!");
        }
      }
    );

    const prom = new Promise((resolve, reject) => {
      const pythonProcess = spawn("python", [
        "C:/repos/PI_2023_4TWIN7_TechTitans/back/scripts/claimTrained.py",
      ]);

      let newdata = "";
      pythonProcess.stdout.on("data", (data) => {
        newdata += data.toString();
      });

      pythonProcess.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
      });

      pythonProcess.on("close", (code) => {
        console.log(`child process exited with code ${code}`);
        // if (code === 0) {

        if (true) {
          const result = newdata; // Remove any leading/trailing whitespace
          // const result = newdata.trim(); // Remove any leading/trailing whitespace
          // console.log("sensensnesne " + sentiment)
          resolve(result);
        } else {
        }
      });
    });
    prom
      .then((result) => {
        let newStr = result.slice(0, -2);
        console.log(newStr)
        res.status(200).json(newStr);
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (err) {
    const errorp = err.message;
    res.status(400).json({ errorp, status: "error" });
  }
};
