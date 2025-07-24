const mongoose = require("mongoose");

const userschema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    password: String,
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true, collection: "user" }
);

const userModel = mongoose.model("user", userschema);
module.exports = userModel;
