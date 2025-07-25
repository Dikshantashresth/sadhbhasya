import React, { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useUserContext } from "../context/context";
import { Link } from "react-router-dom";
import LoaderComponent from "./LoaderComponent";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const MainContent = () => {
  const [fitnessPlan, setFitnessPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { username, id } = useUserContext();
const [aiSuggestions, setAiSuggestions] = useState("");
  const TARGET_CALORIES = 2500;

  // Local state to hold calories eaten from Calories.jsx (stored in localStorage)
  const [caloriesEaten, setCaloriesEaten] = useState(0);

  useEffect(() => {
    // Load calories eaten from localStorage when component mounts
    const storedCalories = localStorage.getItem("caloriesEaten");
    setCaloriesEaten(storedCalories ? parseInt(storedCalories, 10) : 0);
  }, []);
  


  useEffect(() => {
    if (!id) return;

    async function fetchHealthTips() {
      try {
        const res = await fetch(`http://localhost:4000/api/health-tips/${id}`);
        const data = await res.json();
        if (data.success) {
          setAiSuggestions(data.suggestions);
        } else {
          setAiSuggestions("No suggestions available.");
        }
      } catch (e) {
        setAiSuggestions("Failed to load suggestions.");
      }
    }

    fetchHealthTips();
  }, [id]);


  useEffect(() => {
    let isMounted = true;

    const fetchFitnessPlan = async () => {
      setLoading(true);
      try {
        setTimeout(async () => {
          const res = await fetch(
            `http://localhost:4000/api/fitness-plan/${id}`
          );
          const json = await res.json();

          if (!res.ok) {
            throw new Error(json.error || "Failed to fetch fitness plan");
          }

          if (isMounted) {
            setFitnessPlan(json.data || json); // use correct key based on your response
            setLoading(false);
          }
        }, 500);
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    if (id) fetchFitnessPlan();

    return () => {
      isMounted = false;
    };
  }, [id]);

useEffect(() => {
  const storedMeals = localStorage.getItem("mealsCalories");
  if (storedMeals) {
    const mealsCalories = JSON.parse(storedMeals);
    const total = Object.values(mealsCalories).reduce((sum, cals) => sum + cals, 0);
    setCaloriesEaten(total);
  }
}, []);
  if (loading) return <p className="text-white"><LoaderComponent/></p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!fitnessPlan)
    return <p className="text-white">No fitness plan data available</p>;

  const {
    calories = 0,
    macronutrients = {},
    waterIntakeLiters = 0,
    recommendedSleepHours = 8,
    workoutRecommendations = [],
    lifestyleAdvice = [],
    warnings = [],
  } = fitnessPlan;



  
// Then in your chart data calculation:
const totalConsumedCalories = parseInt(localStorage.getItem('RemCalories'), 10) || 0;

const caloriesData = {
  labels: ["Consumed", "Remaining"],
  datasets: [
    {
      label: "Calories",
      data: [
        totalConsumedCalories,
        Math.max(TARGET_CALORIES - totalConsumedCalories, 0),
      ],
      backgroundColor: ["#3b82f6", "#374151"],
    },
  ],
};

  // Optionally you can update macros if you want, or keep them from fitnessPlan

  const waterData = {
    labels: ["Water Intake", "Remaining"],
    datasets: [
      {
        label: "Water Intake (L)",
        data: [waterIntakeLiters, Math.max(0, 3 - waterIntakeLiters)],
        backgroundColor: ["#60a5fa", "#1f2937"],
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-4xl font-extrabold text-white mb-2">
          Hello, {username}
        </h1>
        <p className="text-blue-400 text-lg">
          Here’s your personalized fitness plan!
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Calories and Macros */}
        <div className="bg-gray-900 rounded-2xl p-6 flex-1 relative cursor-pointer">
          <h2 className="text-teal-400 text-3xl mb-4 flex justify-between items-center">
            Calories & Macros
            <Link to="calories">
              <button
                className="text-teal-400 hover:text-teal-300 flex items-center gap-1 cursor-pointer"
                aria-label="Go to Calories details"
              >
                Details{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
            </Link>
          </h2>

          <Bar
            data={caloriesData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
            }}
          />

          <div className="mt-6 space-y-1">
            <p className="text-white text-lg font-semibold">
              Macronutrients (g):
            </p>
            <p className="text-blue-400">Protein: {macronutrients.protein}</p>
            <p className="text-blue-400">Carbs: {macronutrients.carbs}</p>
            <p className="text-blue-400">Fats: {macronutrients.fats}</p>
          </div>
        </div>

        {/* Water Intake */}
        <div className="bg-gray-900 rounded-2xl p-6 flex-1 flex flex-col items-center justify-center">
          <h2 className="text-teal-400 text-3xl mb-4">Water Intake</h2>
          <Doughnut
            data={waterData}
            options={{
              responsive: true,
              plugins: { legend: { position: "bottom" } },
            }}
            style={{ maxWidth: 200 }}
          />
          <p className="mt-4 text-white font-semibold">{waterIntakeLiters} Liters</p>
          <p className="text-gray-400">Recommended: 3 Liters</p>
        </div>
      </div>

      {/* Sleep & Workout */}
      <div className="bg-gray-900 rounded-2xl p-6 mb-8">
        <h2 className="text-teal-400 text-3xl mb-4">Sleep & Workout</h2>
        <p className="text-white text-xl mb-2">
          Recommended Sleep Hours:{" "}
          <span className="font-bold">{recommendedSleepHours}</span>
        </p>
        <p className="text-white text-xl">
          Workout Recommendations:
          <ul className="list-disc ml-6 mt-2">
            {workoutRecommendations.map((item, idx) => (
              <li key={idx} className="text-blue-400">
                {item}
              </li>
            ))}
          </ul>
        </p>
      </div>

      {/* Lifestyle Advice */}
      <div className="bg-blue-900 rounded-2xl p-6 mb-8">
        <h2 className="text-white text-3xl mb-4 font-semibold">Lifestyle Advice</h2>
        <ul className="list-disc list-inside space-y-2 text-blue-300">
          {lifestyleAdvice.map((advice, idx) => (
            <li key={idx}>{advice}</li>
          ))}
        </ul>
      </div>

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="bg-red-900 rounded-2xl p-6 mb-8">
          <h2 className="text-white text-3xl mb-4 font-semibold">Warnings</h2>
          <ul className="list-disc list-inside space-y-2 text-red-400">
            {warnings.map((warn, idx) => (
              <li key={idx}>{warn}</li>
            ))}
          </ul>
        </div>
      )}

      {/* AI Suggestions */}
      <div className="mt-10 bg-blue-800 rounded-2xl p-12 flex justify-center text-white flex-col">
  <div className="text-3xl font-bold mb-4">Suggestions</div>
  <div className="space-y-4">
    {aiSuggestions &&
      aiSuggestions.split("\n").map((suggestion, index) => {
        if (suggestion.trim() === "") return null;
        return (
          <div key={index} className="pl-4 border-l-4 border-white italic">
            <p className="before:content-['“'] after:content-['”'] text-lg">{suggestion.trim()}</p>
          </div>
        );
      })}
  </div>
</div>

    </div>
  );
};

export default MainContent;
