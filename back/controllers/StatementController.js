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

module.exports.gen_pdf = async (req, res) => {
  const { date, lieu, blesse } = req.body;
  const existingPdfBytes = await fs.promises.readFile("constat.pdf");
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const page = pdfDoc.getPages()[0];
  const { width, height } = page.getSize();
  const fontSize = 8;
  const text = "Hello, World!";
  const textWidth = font.widthOfTextAtSize(text, fontSize);
  page.drawText(text, { x: 36, y:  height - 90 , size: fontSize, color: rgb(0, 0, 0),}); //date
  page.drawText(text, { x: 174, y:  height - 90 , size: fontSize, color: rgb(0, 0, 0),}); //lieu
  page.drawText("x", { x: 475, y:  height - 100 , size: fontSize, color: rgb(0, 0, 0),}); //blesse non
  page.drawText("x", { x: 550, y:  height - 100 , size: fontSize, color: rgb(0, 0, 0),}); //blesse oui
  page.drawText("x", { x: 70, y:  height - 131 , size: fontSize, color: rgb(0, 0, 0),}); // degat non
  page.drawText("x", { x: 147, y:  height - 133 , size: fontSize, color: rgb(0, 0, 0),}); //degats oui
  page.drawText(text, { x: 188, y:  height - 123 , size: fontSize, color: rgb(0, 0, 0),}); //temoins
  page.drawText(text, { x: 118, y:  height - 183 , size: fontSize, color: rgb(0, 0, 0),}); //assuré par
  page.drawText(text, { x: 129, y:  height - 204 , size: fontSize, color: rgb(0, 0, 0),}); //assurance
  page.drawText(text, { x: 63, y:  height - 220 , size: fontSize, color: rgb(0, 0, 0),}); //agence
  page.drawText(text, { x: 49, y:  height - 256 , size: fontSize, color: rgb(0, 0, 0),}); //du
  page.drawText(text, { x: 137, y:  height - 256 , size: fontSize, color: rgb(0, 0, 0),}); //au
  page.drawText(text, { x: 59, y:  height - 289 , size: fontSize, color: rgb(0, 0, 0),}); //nom
  page.drawText(text, { x: 68, y:  height - 303 , size: fontSize, color: rgb(0, 0, 0),}); //prenom
  page.drawText(text, { x: 71, y:  height - 325 , size: fontSize, color: rgb(0, 0, 0),}); //adresse
  page.drawText(text, { x: 138, y:  height - 341 , size: fontSize, color: rgb(0, 0, 0),}); //permis
  page.drawText(text, { x: 87, y:  height - 357 , size: fontSize, color: rgb(0, 0, 0),}); //delivre
  page.drawText(text, { x: 59, y:  height - 389 , size: fontSize, color: rgb(0, 0, 0),}); //assuré
  page.drawText(text, { x: 68, y:  height - 405 , size: fontSize, color: rgb(0, 0, 0),}); //prenom
  page.drawText(text, { x: 77, y:  height - 420 , size: fontSize, color: rgb(0, 0, 0),}); //adresse
  page.drawText(text, { x: 162, y:  height - 438 , size: fontSize, color: rgb(0, 0, 0),}); //tel
  page.drawText(text, { x: 97, y:  height - 475 , size: fontSize, color: rgb(0, 0, 0),}); //marque
  page.drawText(text, { x: 120, y:  height - 490 , size: fontSize, color: rgb(0, 0, 0),}); //imm
  page.drawText(text, { x: 80, y:  height - 525 , size: fontSize, color: rgb(0, 0, 0),}); //de
  page.drawText(text, { x: 71, y:  height - 545 , size: fontSize, color: rgb(0, 0, 0),}); //allant
  //-------------- VEH B
  page.drawText(text, { x: 480, y:  height - 185 , size: fontSize, color: rgb(0, 0, 0),}); //assuré
  page.drawText(text, { x: 485, y:  height - 201 , size: fontSize, color: rgb(0, 0, 0),}); //ass
  page.drawText(text, { x: 423, y:  height - 220 , size: fontSize, color: rgb(0, 0, 0),}); //ass
  page.drawText(text, { x: 423, y:  height - 256 , size: fontSize, color: rgb(0, 0, 0),}); //du
  page.drawText(text, { x: 515, y:  height - 257 , size: fontSize, color: rgb(0, 0, 0),}); //au
  page.drawText(text, { x: 438, y:  height - 287 , size: fontSize, color: rgb(0, 0, 0),}); //nom
  page.drawText(text, { x: 447, y:  height - 305 , size: fontSize, color: rgb(0, 0, 0),}); //prenom
  page.drawText(text, { x: 449, y:  height - 323 , size: fontSize, color: rgb(0, 0, 0),}); //adrese
  page.drawText(text, { x: 519, y:  height - 342 , size: fontSize, color: rgb(0, 0, 0),}); //permis
  page.drawText(text, { x: 455, y:  height - 355 , size: fontSize, color: rgb(0, 0, 0),}); //delivere
  page.drawText(text, { x: 439, y:  height - 392 , size: fontSize, color: rgb(0, 0, 0),}); //nom
  page.drawText(text, { x: 449, y:  height - 407 , size: fontSize, color: rgb(0, 0, 0),}); //prenom
  page.drawText(text, { x: 454, y:  height - 422 , size: fontSize, color: rgb(0, 0, 0),}); //addr
  page.drawText(text, { x: 530, y:  height - 440 , size: fontSize, color: rgb(0, 0, 0),}); //tel
  page.drawText(text, { x: 476, y:  height - 478 , size: fontSize, color: rgb(0, 0, 0),}); //marque
  page.drawText(text, { x: 497, y:  height - 490 , size: fontSize, color: rgb(0, 0, 0),}); //imm
  page.drawText(text, { x: 459, y:  height - 528 , size: fontSize, color: rgb(0, 0, 0),}); //vevant
  page.drawText(text, { x: 452, y:  height - 545 , size: fontSize, color: rgb(0, 0, 0),}); //allant

  page.drawText("x", { x: 220, y:  height - 200 , size: fontSize, color: rgb(0, 0, 0),}); //1A
  page.drawText("x", { x: 220, y:  height - 222 , size: fontSize, color: rgb(0, 0, 0),}); //2A
  page.drawText("x", { x: 220, y:  height - 241 , size: fontSize, color: rgb(0, 0, 0),}); //3A
  page.drawText("x", { x: 220, y:  height - 260 , size: fontSize, color: rgb(0, 0, 0),}); //4A
  page.drawText("x", { x: 220, y:  height - 285 , size: fontSize, color: rgb(0, 0, 0),}); //5A
  page.drawText("x", { x: 220, y:  height - 305 , size: fontSize, color: rgb(0, 0, 0),}); //6A
  page.drawText("x", { x: 220, y:  height - 325 , size: fontSize, color: rgb(0, 0, 0),}); //7A
  page.drawText("x", { x: 220, y:  height - 345 , size: fontSize, color: rgb(0, 0, 0),}); //8A
  page.drawText("x", { x: 220, y:  height - 365 , size: fontSize, color: rgb(0, 0, 0),}); //9A
  page.drawText("x", { x: 220, y:  height - 385 , size: fontSize, color: rgb(0, 0, 0),}); //10A
  page.drawText("x", { x: 220, y:  height - 405 , size: fontSize, color: rgb(0, 0, 0),}); //11A
  page.drawText("x", { x: 220, y:  height - 425 , size: fontSize, color: rgb(0, 0, 0),}); //12A
  page.drawText("x", { x: 220, y:  height - 445 , size: fontSize, color: rgb(0, 0, 0),}); //13A
  page.drawText("x", { x: 220, y:  height - 465 , size: fontSize, color: rgb(0, 0, 0),}); //14A
  page.drawText("x", { x: 220, y:  height - 485 , size: fontSize, color: rgb(0, 0, 0),}); //15A
  page.drawText("x", { x: 220, y:  height - 505 , size: fontSize, color: rgb(0, 0, 0),}); //16A
  page.drawText("x", { x: 220, y:  height - 525 , size: fontSize, color: rgb(0, 0, 0),}); //17A
  
  page.drawText("x", { x: 380, y:  height - 200 , size: fontSize, color: rgb(0, 0, 0),}); //1B
  page.drawText("x", { x: 380, y:  height - 222 , size: fontSize, color: rgb(0, 0, 0),}); //2B
  page.drawText("x", { x: 380, y:  height - 241 , size: fontSize, color: rgb(0, 0, 0),}); //3B
  page.drawText("x", { x: 380, y:  height - 260 , size: fontSize, color: rgb(0, 0, 0),}); //4B
  page.drawText("x", { x: 380, y:  height - 285 , size: fontSize, color: rgb(0, 0, 0),}); //5B
  page.drawText("x", { x: 380, y:  height - 305 , size: fontSize, color: rgb(0, 0, 0),}); //6B
  page.drawText("x", { x: 380, y:  height - 325 , size: fontSize, color: rgb(0, 0, 0),}); //7B
  page.drawText("x", { x: 380, y:  height - 345 , size: fontSize, color: rgb(0, 0, 0),}); //8B
  page.drawText("x", { x: 380, y:  height - 365 , size: fontSize, color: rgb(0, 0, 0),}); //9B
  page.drawText("x", { x: 380, y:  height - 385 , size: fontSize, color: rgb(0, 0, 0),}); //10B
  page.drawText("x", { x: 380, y:  height - 405 , size: fontSize, color: rgb(0, 0, 0),}); //11B
  page.drawText("x", { x: 380, y:  height - 425 , size: fontSize, color: rgb(0, 0, 0),}); //12B
  page.drawText("x", { x: 380, y:  height - 445 , size: fontSize, color: rgb(0, 0, 0),}); //13B
  page.drawText("x", { x: 380, y:  height - 465 , size: fontSize, color: rgb(0, 0, 0),}); //14B
  page.drawText("x", { x: 380, y:  height - 485 , size: fontSize, color: rgb(0, 0, 0),}); //15B
  page.drawText("x", { x: 380, y:  height - 505 , size: fontSize, color: rgb(0, 0, 0),}); //16B
  page.drawText("x", { x: 380, y:  height - 525 , size: fontSize, color: rgb(0, 0, 0),}); //17B


 
  

  const pdfBytes = await pdfDoc.save();
  await fs.promises.writeFile("new.pdf", pdfBytes);
  res.status(200).json({ width , height});
};