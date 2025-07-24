const mongoose = require("mongoose");

const FitnessSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  height: Number,
  weight: Number,
  activityLevel: String,
  sleepHours: Number,
  waterIntake: Number,
  fitnessGoal: String,
  medicalNote: String,
  fitnessPlan: mongoose.Schema.Types.Mixed, 
}, { timestamps: true });

const FitnessModel = mongoose.model("FitnessPlan", FitnessSchema);
module.exports = FitnessModel;
