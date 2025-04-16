const mongoose = require("mongoose");

const CommunityChatSchema = new mongoose.Schema({
  groupId: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CommunityChat", CommunityChatSchema);
