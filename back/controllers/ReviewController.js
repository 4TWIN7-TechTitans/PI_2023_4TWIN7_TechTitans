const ReviewModel = require("../models/review");

module.exports.addReview = async (req, res) => {
  try {
    const newReview = await ReviewModel.create({
      id_expert: req.body.id_expert,
      review: req.body.review,
    });
    res
      .status(201)
      .json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add review" });
  }
};

module.exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await ReviewModel.find({});
    res.status(200).json({ reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve reviews" });
  }
};

const { spawn } = require('child_process');
module.exports.calc = async (req, res) => {
  try {
    const id = req.body.id;
    console.log(id);

    const review = await ReviewModel.findById(id);
    // 64598243379f1afd34842690
    //exec python

    let args = review.review;

    //get result

    const prom = new Promise((resolve, reject) => {
      const pythonProcess = spawn("python", [
        "C:/repos/PI_2023_4TWIN7_TechTitans/back/scripts/m/emotion.py",
        args,
      ]);
      let newdata = "";
      pythonProcess.stdout.on("data", (data) => {
        newdata += data.toString();
        // console.log("datadata "  + newdata)
      });

      pythonProcess.stderr.on("data", (data) => {
        // console.error(`stderr: ${data}`);
      });

      pythonProcess.on("close", (code) => {
        console.log(`child process exited with code ${code}`);
        if (code === 0) {
          const sentiment = newdata.trim(); // Remove any leading/trailing whitespace
            // console.log("sensensnesne " + sentiment)
          resolve(sentiment);
        } else {
        }
      });
    });


    await prom;
    let returnresult = "";
    // prom.then((result) => {
    //   console.log(result);
    //   returnresult = result;
    // });


    
    prom
    .then((sentiment) => {
      console.log(`Sentiment: ${sentiment}`);
      const sub = sentiment.substr(35, 10)
      res.status(200).json({ sub });
    })
    .catch((err) => {
      console.error(err);
    });


    // res.status(200).json({ returnresult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve reviews" });
  }
};
