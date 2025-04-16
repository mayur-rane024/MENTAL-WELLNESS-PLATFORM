const mongoose = require("mongoose");

const ChatHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  messages: [
    {
      sender: String, // "user" or "bot"
      text: String,
      timestamp: { type: Date, default: Date.now }
    }
  ],
});

module.exports = mongoose.model("ChatHistory", ChatHistorySchema);
