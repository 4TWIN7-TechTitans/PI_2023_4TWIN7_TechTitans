const OffreModel = require("../models/offre");
const request = require("request-promise");
const cheerio = require("cheerio");

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

const cron = require("node-cron");

cron.schedule("*/30 * * * *", () => {
  scrap();
});

module.exports.scrap = async (req, res) => {
  try {
    const result = await request.get(
      "https://www.cga.gov.tn/index.php?id=148&L=0"
    );
    let reassurance = false;
    const $ = cheerio.load(result);
    const scrappedData = [];
    $("#c357 > table > tbody > tr").each((index, element) => {
      if (index === 0) return true;
      if (reassurance === true) return true;
      const tds = $(element).find("td");
      const societe = $(tds[0]).text();

      if (societe === " Réassurance ") {
        reassurance = true;
        return true;
      }

      const addresse = $(tds[4]).text();
      const phone = $(tds[5]).text();
      if (phone.length < 3) return true;
      const site = $(tds[6]).text();
      if (site.length < 3) return true;

      const domaine = getDomainFromUrl(site);
      const email = "contact@" + domaine;
      const row = { societe, addresse, phone, site, email };

      scrappedData.push(row);
    });

    await addOffres(scrappedData);
    res.status(200).json(scrappedData);
  } catch (err) {
    res.status(400).json(err);
  }
};

const addOffres = async (produits) => {
  OffreModel.collection.drop();

  produits.forEach((element) => {
    OffreModel.create({ ...element });
  });
};

function getDomainFromUrl(url) {
  const domainRegex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im;
  const matches = domainRegex.exec(url);
  if (matches && matches.length > 1) {
    return matches[1];
  }
  return null;
}

module.exports.get_all = async (req, res) => {
  try {
    const offres = await OffreModel.find({});
    res.status(200).json({
      offres,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to retrieve users",
      status: "error",
    });
  }
};
