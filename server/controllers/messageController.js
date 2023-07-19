const Message = require("../models/messageModal");

const addMessage = async (req, res) => {
  try {
    const { from, to, message } = req.body;
    console.log(from, to, message);
    const data = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    console.log(data);
    if (data) return res.json({ msg: "Message added successfully" });
    return res.json({ msg: "Failed to add message to database" });
  } catch (error) {
    res.json({});
  }
};

const getAllMessage = async (req, res) => {
  try {
    const { from, to } = req.body;
    const messages = await Message.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });
    const projectMessage = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectMessage);
  } catch (error) {}
};

module.exports = { addMessage, getAllMessage };
