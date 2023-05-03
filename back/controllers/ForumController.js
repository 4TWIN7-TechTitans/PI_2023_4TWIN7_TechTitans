const { Forum, Reply } = require("../models/forum");

// post message
module.exports.add_message = async (req, res) => {
  try {
    const msg = await new Forum(req.body).save();
    res.status(201).send({ msg, message: "message sent successfully" });
  } catch (error) {
    console.log(error);
  }
};

  try {
    id = req.params.id;
    const findMsg = await Forum.findById(id);
    if (findMsg) {
      const msg = await Forum.findByIdAndUpdate(id, req.body, {
        new: true,
      }).populate("clientId");
      res.status(201).send({ msg, message: "message updated successfully" });
    } else {
      res.status(401).send({ message: "can't find message" });
    }
  } catch (error) {
    console.log(error);
  }
};

//get all messages
module.exports.get_message = async (req, res) => {
  try {
    const message = await Forum.find().populate("clientId");
    if (message) {
      const msgs = Promise.all(
        message.map(async (msg) => {
          const reply = await Reply.findOne({ forumId: msg.id });
          return { msg, reply };
        })
      );
      const msgReply = await msgs;
      res.status(201).send({ msgReply, message: "data fetched successfully" });
    } else res.status(401).send({ message: "data not found" });
  } catch (error) {
    console.log(error);
  }
};

// delete msg
module.exports.delete_message = async (req, res) => {
  try {
    id = req.params["id"];
    const msg = await Forum.findById(id);
    if (msg) {
      await Forum.findByIdAndRemove(id);
      await Reply.findOneAndRemove({ forumId: id });
      res.status(201).send({ message: "message deleted successfully" });
    }
  } catch (error) {
    console.log(error);
  }
};

//post a reply
module.exports.add_reply = async (req, res) => {
  try {
    const rep = await new Reply(req.body).save();
    res.status(201).send({ rep, message: "reply added successfully" });
  } catch (error) {
    console.log(error);
  }
};

//update a reply
module.exports.update_reply = async (req, res) => {
  try {
    const id = req.params.id;
    const findRep = await Reply.findById(id);
    if (findRep) {
      const rep = await Reply.findByIdAndUpdate(id, req.body, { new: true });
      res.status(201).send({ rep, message: "reply updated successfully" });
    } else res.status(401).send({ message: "can't find reply" });
  } catch (error) {
    console.log(error);
  }
};

// delete a reply
module.exports.del_reply = async (req, res) => {
  try {
    const id = req.params.id;
    const findRep = await Reply.findById(id);
    if (findRep) {
      await Reply.findByIdAndRemove(req.params.id);
      res.status(201).send({ message: "reply deleted successfully" });
    } else res.status(401).send({ message: "can't find reply" });
  } catch (error) {
    console.log(error);
  }
};
