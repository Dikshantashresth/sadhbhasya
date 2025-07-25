import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useUserContext } from "../context/context";

const Dashboard = () => {
  const { username } = useUserContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* Sidebar Toggle for Mobile */}
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
        className={`fixed top-0 left-0 h-full w-64 bg-black border-r border-gray-800 z-40 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0`}
      >
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-extrabold tracking-wide text-blue-400">Sadhbhyasa</h2>
        </div>
        <nav className="mt-6 px-4">
          <ul className="space-y-1">
            <li>
              <Link
                to={`/dashboard/${username}`}
                className="flex items-center px-3 py-3 rounded-full hover:bg-blue-800 transition-colors duration-200"
              >
                <HomeIcon className="h-6 w-6 text-blue-400 mr-4" />
                <span className="font-semibold text-white">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/chat/general"
                className="flex items-center px-3 py-3 rounded-full hover:bg-blue-800 transition-colors duration-200"
              >
                <ChatBubbleLeftEllipsisIcon className="h-6 w-6 text-blue-400 mr-4" />
                <span className="font-semibold text-white">Chats</span>
              </Link>
            </li>
            <li>
              <Link
                to="settings"
                className="flex items-center px-3 py-3 rounded-full hover:bg-blue-800 transition-colors duration-200"
              >
                <Cog6ToothIcon className="h-6 w-6 text-blue-400 mr-4" />
                <span className="font-semibold text-white">Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-70 z-30 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Main content with scroll */}
      <main className="flex-1 overflow-y-auto p-6 bg-black md:ml-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
