const ReviewModel = require("../models/review");

module.exports.addReview = async (req, res) => {
  try {
    console.log(req.body.review);
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
    const review = await ReviewModel.findById(id);
    let args = review.review;

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
        const sub = sentiment.substr(35, 10);
        
        const name = sub.substr(0, 3);
        let number = parseFloat(sub.substr(5, 5));
        if (name == "POS") {
          
        } else if (name == "NEG") {
          number = -number
        } else if (name == "NEU") {
        }
        
        number = ((number + 1) * 50).toFixed(3);

        res.status(200).json({ sub: number });
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

module.exports.calcAverage = async (req, res) => {
  try {

    let somme=0;
    const promises = [];

    const expertId = req.body.expertId;
    const reviews = await ReviewModel.find({ id_expert: expertId });
    const count = reviews.length;
    reviews.forEach((elem) => {
      let args = elem.review;

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
          resolve(sentiment);
        } else {
        }
      });
    }
    
    );

    promises.push(prom);

    // prom
    // .then((sentiment) => {
    //   console.log(`Sentiment: ${sentiment}`);
    //   const sub = sentiment.substr(35, 10)
    //   res.status(200).json({ sub });
    // })
    // .catch((err) => {
    //   console.error(err);
    // });


    });

    Promise.all(promises)
      .then((results) => {
        // All promises have resolved
        let avg = 0.0;
        let count = results.length;
        results.forEach((elem) => {
          const sub = elem.substr(35, 10);
          const name = sub.substr(0, 3);
          const number = parseFloat(sub.substr(5, 5));
          if (name == "POS") {
            avg = avg + number
          } else if (name == "NEG") {
            avg = avg - number
          } else if (name == "NEU") {
          }
          console.log(name);
          console.log(number);
        });
        console.log(count);
        console.log(avg);
        avg = avg / count
        console.log(avg);
        avg = avg +1;
        avg = avg *50;
        avg = avg.toFixed(3);
        res.status(200).json({ avg });
      })
      .catch((error) => {
        // An error occurred in one of the promises
        console.error(error);
      });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve reviews" });
  }
};