import React, { useState, useEffect } from "react";
import axios from "axios";

const MEALS = ["Breakfast", "Lunch", "Dinner", "Snacks"];

const Calories = ({ targetCalories = 2000 }) => {
  const [input, setInput] = useState("");
  const [selectedMeal, setSelectedMeal] = useState(MEALS[0]);
  const [mealNutrition, setMealNutrition] = useState(null);
  const [mealsCalories, setMealsCalories] = useState({
    Breakfast: 0,
    Lunch: 0,
    Dinner: 0,
    Snacks: 0,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load calories per meal from localStorage on mount
    const storedMeals = localStorage.getItem("mealsCalories");
    if (storedMeals) {
      setMealsCalories(JSON.parse(storedMeals));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!input.trim()) {
      setError("Please enter food description");
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/api/nutrition/parse", {
        foodDescription: input,
      });

      if (res.data.success) {
        const nutritionData = res.data.nutritionData;
        setMealNutrition(nutritionData);

        // Update calories for the selected meal
        const updatedMeals = {
          ...mealsCalories,
          [selectedMeal]: mealsCalories[selectedMeal] + nutritionData.calories,
        };

        setMealsCalories(updatedMeals);
        localStorage.setItem("mealsCalories", JSON.stringify(updatedMeals));
        localStorage.setItem('RemCalories',remainingCalories)
        setInput("");
      } else {
        setError("Failed to get nutrition data");
      }
    } catch (err) {
      setError(err.message || "Error fetching nutrition data");
    }
  };

  const totalCalories = Object.values(mealsCalories).reduce(
    (sum, cals) => sum + cals,
    0
  );
  
  const remainingCalories = targetCalories - totalCalories;
  localStorage.getItem('RemCalories',remainingCalories)

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-900 rounded-xl text-white">
      <h1 className="text-3xl mb-4">Add Meal & Calculate Calories</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <label htmlFor="mealSelect" className="block mb-2">
          Select Meal
        </label>
        <select
          id="mealSelect"
          value={selectedMeal}
          onChange={(e) => setSelectedMeal(e.target.value)}
          className="mb-4 p-2 rounded text-white w-full"
        >
          {MEALS.map((meal) => (
            <option key={meal} value={meal}>
              {meal}
            </option>
          ))}
        </select>

        <label htmlFor="foodInput" className="block mb-2">
          Enter food description (e.g. "800g chicken breast")
        </label>
        <input
          id="foodInput"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter food and ingredients..."
          className="w-full p-2 rounded text-white"
          required
        />

        <button
          type="submit"
          className="mt-3 bg-teal-500 px-4 py-2 rounded hover:bg-teal-600"
        >
          Calculate
        </button>
      </form>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      {mealNutrition && (
        <div className="mb-6 p-4 bg-gray-800 rounded">
          <h2 className="text-xl font-semibold mb-2">Meal Nutrition</h2>
          <p>Calories: {mealNutrition.calories}</p>
          <p>Protein: {mealNutrition.protein} g</p>
          <p>Carbs: {mealNutrition.carbs} g</p>
          <p>Fats: {mealNutrition.fats} g</p>
        </div>
      )}

      <div className="p-4 bg-gray-700 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">Calories by Meal</h2>
        <ul>
          {MEALS.map((meal) => (
            <li key={meal} className="text-blue-400">
              {meal}: {mealsCalories[meal]} kcal
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 bg-gray-700 rounded">
        <h2 className="text-xl font-semibold mb-2">Summary</h2>
        <p>Total Calories Eaten: {totalCalories}</p>
        <p>Remaining Calories: {remainingCalories > 0 ? remainingCalories : 0}</p>
      </div>
    </div>
  );
};

export default Calories;
