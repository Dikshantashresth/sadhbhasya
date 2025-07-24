import React, { useState } from "react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-black border border-gray-700 rounded-full shadow-lg hover:bg-gray-900 transition"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? (
          <XMarkIcon className="h-6 w-6 text-white" />
        ) : (
          <Bars3Icon className="h-6 w-6 text-white" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-black border-r border-gray-800
          shadow-xl z-40
          transform md:translate-x-0 transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0
        `}
      >
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-extrabold tracking-wide text-blue-400">Sadhbhyasa</h2>
        </div>
        <nav className="mt-6 px-4">
          <ul className="space-y-1">
            <li>
              <a
                href="#"
                className="flex items-center px-3 py-3 rounded-full hover:bg-blue-800 transition-colors duration-200"
              >
                <HomeIcon className="h-6 w-6 text-blue-400 mr-4" />
                <span className="font-semibold text-white">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center px-3 py-3 rounded-full hover:bg-blue-800 transition-colors duration-200"
              >
                <ChatBubbleLeftEllipsisIcon className="h-6 w-6 text-blue-400 mr-4" />
                <span className="font-semibold text-white">Chats</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center px-3 py-3 rounded-full hover:bg-blue-800 transition-colors duration-200"
              >
                <Cog6ToothIcon className="h-6 w-6 text-blue-400 mr-4" />
                <span className="font-semibold text-white">Settings</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-70 z-30 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Main content */}
      <main className="flex-1 ml-0 md:ml-4 p-8 overflow-y-auto bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-4xl font-extrabold text-white mb-2">Hello, Ishan</h1>
            <p className="text-blue-400 text-lg">You are doing well. Keep it up!</p>
          </div>

          {/* Top Cards */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="bg-gray-900 rounded-2xl p-6 flex-1">
              <p className="text-teal-400 text-3xl mb-2">🛌 Sleep</p>
              <p className="text-gray-400 text-lg">Time Asleep</p>
              <p className="text-white text-6xl font-semibold">
                1 <span className="text-3xl align-top">hr</span>{" "}
                <span className="text-5xl">47</span> <span className="text-3xl align-top">min</span>
              </p>
            </div>
            <div className="bg-gray-900 rounded-2xl p-6 flex-1">
              <h2 className="text-lg font-semibold text-white mb-4">Daily Goals</h2>

              {/* Calories */}
              <div className="mb-4">
                <div className="flex justify-between text-sm font-medium text-gray-400 mb-1">
                  <span>🔥 Calories Burned</span>
                  <span>1500/2000</span>
                </div>
                <div className="w-full bg-gray-800 h-2 rounded-full">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "75%" }}></div>
                </div>
              </div>

              {/* Steps */}
              <div className="mb-4">
                <div className="flex justify-between text-sm font-medium text-gray-400 mb-1">
                  <span>👟 Steps Taken</span>
                  <span>500/1000</span>
                </div>
                <div className="w-full bg-gray-800 h-2 rounded-full">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "50%" }}></div>
                </div>
              </div>

              {/* Workout */}
              <div>
                <div className="flex justify-between text-sm font-medium text-gray-400 mb-1">
                  <span>⏱ Workout Time</span>
                  <span>45/60</span>
                </div>
                <div className="w-full bg-gray-800 h-2 rounded-full">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "75%" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* User Activity and Suggestions */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* User Activity Chart */}
            <div className="bg-gray-900 rounded-2xl p-6 flex-1 h-56 md:h-64">
              <h2 className="text-xl font-semibold mb-4 text-white">User Activity</h2>
              {/* Placeholder for chart */}
              <canvas id="userActivityChart" className="w-full h-full bg-gray-800 rounded" />
            </div>

            {/* Exercise Suggestions */}
            <div className="bg-blue-900 rounded-2xl p-6 flex-1 h-56 md:h-64 overflow-y-auto">
              <h2 className="text-lg font-semibold mb-4 text-white">Exercise Suggestions</h2>
              <ul className="space-y-4">
                {[
                  { emoji: "🦵", name: "Band Hip Adductions", type: "strength" },
                  { emoji: "🔄", name: "Groin and Back Stretch", type: "stretching" },
                  { emoji: "🔄", name: "Side Lying Groin Stretch", type: "stretching" },
                ].map(({ emoji, name, type }) => (
                  <li key={name} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{emoji}</span>
                      <div>
                        <p className="text-white font-medium">{name}</p>
                        <p className="text-blue-300 text-sm capitalize">{type}</p>
                      </div>
                    </div>
                    <button className="text-blue-400 hover:text-blue-600 text-2xl font-bold">+</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* AI Suggestions */}
          <div className="mt-10 bg-blue-800 rounded-2xl p-12 flex justify-center items-center text-white text-4xl md:text-6xl font-extrabold">
            AI Suggestions
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
