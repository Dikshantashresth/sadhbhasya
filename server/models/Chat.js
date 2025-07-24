const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
  {
    chatName: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "chats",
  }
);

const ChatModel = mongoose.model("Room", RoomSchema);
module.exports = ChatModel;
