const express = require("express");
const CommunityChat = require("../models/CommunityChat");

const router = express.Router();

// Save group chat message
router.post("/send", async (req, res) => {
  const { groupId, userId, message } = req.body;
  const chat = new CommunityChat({ groupId, userId, message });
  await chat.save();
  res.json({ message: "Message sent!" });
});

// Get all messages from a group
router.get("/:groupId", async (req, res) => {
  const messages = await CommunityChat.find({ groupId }).populate("userId", "name");
  res.json(messages);
});

module.exports = router;
