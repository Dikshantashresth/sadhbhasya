import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "../context/context";
import { useNavigate } from "react-router-dom";

const GetForm = () => {
  const { username, id } = useUserContext(); // ✅ From context
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: "",
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

  // ✅ Inject userId and name from context on mount
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      userId: id || "",
      name: username || "",
    }));
  }, [id, username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/submit-biodata",
        formData,
        { withCredentials: true }
      );

      if (res.data.redirectToDashboard) {
        navigate(`/dashboard/${res.data.username}`); // ✅ Redirect with username
      }
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 flex justify-center items-center">
      <div className="bg-black p-6 rounded-xl shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 pb-2 ">
          Credintials
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name is now readonly from context */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-2 rounded bg-transparent border border-white text-gray-300"
            value={formData.name}
            readOnly
          />

          {/* Age & Gender */}
          <div className="flex gap-4">
            <input
              type="number"
              name="age"
              placeholder="Age"
              className="w-full p-2 rounded bg-transparent border border-white text-white"
              value={formData.age}
              onChange={handleChange}
              required
            />
            <select
              name="gender"
              className="w-full p-2 rounded bg-transparent border border-white text-white"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Gender</option>
              <option value="Male" className="text-black">Male</option>
              <option value="Female" className="text-black">Female</option>
              <option value="Other" className="text-black">Other</option>
            </select>
          </div>

          {/* Height & Weight */}
          <div className="flex gap-4">
            <input
              type="number"
              name="height"
              placeholder="Height (cm)"
              className="w-full p-2 rounded bg-transparent border border-white text-white"
              value={formData.height}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="weight"
              placeholder="Weight (kg)"
              className="w-full p-2 rounded bg-transparent border border-white text-white"
              value={formData.weight}
              onChange={handleChange}
              required
            />
          </div>

          {/* Activity Level */}
          <select
            name="activityLevel"
            className="w-full p-2 rounded bg-transparent border border-white text-white"
            value={formData.activityLevel}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Activity Level</option>
            <option value="Sedentary" className="text-black">Sedentary</option>
            <option value="Lightly active" className="text-black">Lightly active</option>
            <option value="Moderately active" className="text-black">Moderately active</option>
            <option value="Very active" className="text-black">Very active</option>
            <option value="Athlete" className="text-black">Athlete</option>
          </select>

          {/* Sleep & Water Intake */}
          <div className="flex gap-4">
            <input
              type="number"
              name="sleepHours"
              placeholder="Sleep (hrs/night)"
              className="w-full p-2 rounded bg-transparent border border-white text-white"
              value={formData.sleepHours}
              onChange={handleChange}
            />
            <input
              type="number"
              step="0.1"
              name="waterIntake"
              placeholder="Water Intake (litres)"
              className="w-full p-2 rounded bg-transparent border border-white text-white"
              value={formData.waterIntake}
              onChange={handleChange}
            />
          </div>

          {/* Fitness Goal */}
          <select
            name="fitnessGoal"
            className="w-full p-2 rounded bg-transparent border border-white text-white"
            value={formData.fitnessGoal}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Fitness Goal</option>
            <option value="Lose Fat" className="text-black">Lose Fat</option>
            <option value="Build Muscle" className="text-black">Build Muscle</option>
            <option value="Improve Endurance" className="text-black">Improve Endurance</option>
            <option value="Maintain Health" className="text-black">Maintain Health</option>
          </select>

          {/* Medical Notes */}
          <textarea
            name="medicalNote"
            placeholder="Medical Conditions or Notes"
            rows="3"
            className="w-full p-2 rounded bg-transparent border border-white text-white resize-none"
            value={formData.medicalNote}
            onChange={handleChange}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 mt-2 bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default GetForm;
