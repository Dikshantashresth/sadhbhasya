const mongoose = require("mongoose");

const userBioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
  calories: { type: Number, default: 0 },
  meals: [
    {
      name: String,
      calories: Number,
      addedAt: { type: Date, default: Date.now }
    }
  ],
  macros: {
    protein: Number,
    carbs: Number,
    fats: Number,
  },
  updatedAt: { type: Date, default: Date.now }
});

const UserBio = mongoose.model("UserBio", userBioSchema);
module.exports = UserBio;
