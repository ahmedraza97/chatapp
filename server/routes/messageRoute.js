const express = require("express");
const router = express.Router();

const {
  getAllMessage,
  addMessage,
} = require("../controllers/messageController");

router.post("/getmsg", getAllMessage);

router.post("/addmsg", addMessage);

module.exports = router;
