const express = require("express");
const ChatHistory = require("../models/ChatHistory");

const router = express.Router();

// Save chat history
router.post("/save", async (req, res) => {
  const { userId, messages } = req.body;
  const chat = new ChatHistory({ userId, messages });
  await chat.save();
  res.json({ message: "Chat history saved!" });
});

// Get user chat history
router.get("/:userId", async (req, res) => {
  const chats = await ChatHistory.find({ userId: req.params.userId });
  res.json(chats);
});

module.exports = router;
