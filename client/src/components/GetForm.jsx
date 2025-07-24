import React, { useState } from "react";
import axios from "axios";
const GetForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    activityLevel: "",
    sleepHours: "",
    waterIntake: "",
    fitnessGoal: "",
    medicalNote: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:4000/submit-biodata",
        formData,{withCredentials:true}
      );
      console.log("LLM Plan Response:", res.data);

    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 flex justify-center items-center">
      <div className="bg-gr bg-black p-6 rounded-xl shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6  pb-2 bg-black border-white">
          Credientials
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-2 rounded bg-transparent border border-white placeholder-gray-400 focus:outline-none"
            value={formData.name}
            onChange={handleChange}
            required
          />

          {/* Age & Gender */}
          <div className="flex gap-4">
            <input
              type="number"
              name="age"
              placeholder="Age"
              className="w-full p-2 rounded bg-transparent border border-white placeholder-gray-400 focus:outline-none appearance-none"
              value={formData.age}
              onChange={handleChange}
              required
            />
            <select
              name="gender"
              className="w-full p-2 rounded bg-transparent border border-white text-white placeholder-gray-400 focus:outline-none"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male" className="text-black">
                Male
              </option>
              <option value="Female" className="text-black">
                Female
              </option>
              <option value="Other" className="text-black">
                Other
              </option>
            </select>
          </div>

          {/* Height & Weight */}
          <div className="flex gap-4">
            <input
              type="number"
              name="height"
              placeholder="Height (cm)"
              className="w-full p-2 rounded bg-transparent border border-white placeholder-gray-400 focus:outline-none appearance-none"
              value={formData.height}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="weight"
              placeholder="Weight (kg)"
              className="w-full p-2 rounded bg-transparent border border-white placeholder-gray-400 focus:outline-none appearance-none"
              value={formData.weight}
              onChange={handleChange}
              required
            />
          </div>

          {/* Activity Level */}
          <select
            name="activityLevel"
            className="w-full p-2 rounded bg-transparent border border-white text-white placeholder-gray-400 focus:outline-none"
            value={formData.activityLevel}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Activity Level
            </option>
            <option value="Sedentary" className="text-black">
              Sedentary
            </option>
            <option value="Lightly active" className="text-black">
              Lightly active
            </option>
            <option value="Moderately active" className="text-black">
              Moderately active
            </option>
            <option value="Very active" className="text-black">
              Very active
            </option>
            <option value="Athlete" className="text-black">
              Athlete
            </option>
          </select>

          {/* Sleep & Water Intake */}
          <div className="flex gap-4">
            <input
              type="number"
              name="sleepHours"
              placeholder="Sleep (hrs/night)"
              className="w-full p-2 rounded bg-transparent border border-white placeholder-gray-400 focus:outline-none appearance-none"
              value={formData.sleepHours}
              onChange={handleChange}
            />
            <input
              type="number"
              name="waterIntake"
              placeholder="Water Intake (litres/day)"
              step="0.1"
              className="w-full p-2 rounded bg-transparent border border-white placeholder-gray-400 focus:outline-none appearance-none"
              value={formData.waterIntake}
              onChange={handleChange}
            />
          </div>

          {/* Fitness Goal */}
          <select
            name="fitnessGoal"
            className="w-full p-2 rounded bg-transparent border border-white text-white placeholder-gray-400 focus:outline-none"
            value={formData.fitnessGoal}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Fitness Goal
            </option>
            <option value="Lose Fat" className="text-black">
              Lose Fat
            </option>
            <option value="Build Muscle" className="text-black">
              Build Muscle
            </option>
            <option value="Improve Endurance" className="text-black">
              Improve Endurance
            </option>
            <option value="Maintain Health" className="text-black">
              Maintain Health
            </option>
          </select>

          {/* Medical Notes */}
          <textarea
            name="medicalNote"
            placeholder="Medical Conditions or Notes (optional)"
            rows="3"
            className="w-full p-2 rounded bg-transparent border border-white placeholder-gray-400 focus:outline-none resize-none"
            value={formData.medicalNote}
            onChange={handleChange}
          ></textarea>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 mt-2 bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default GetForm;
