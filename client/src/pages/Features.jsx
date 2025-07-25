import React from "react";
import NavBar from "../components/NavBar";

const features = [
  {
    id: 1,
    title: "Accounts",
    desc: "Manage an unlimited number of accounts in 30 currencies",
    icon: (
      <svg
        className="w-8 h-8 text-blue-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M3 10h18M7 6h10M7 14h6M3 18h18"></path>
      </svg>
    ),
  },
  {
    id: 2,
    title: "Roles & Permissions",
    desc: "Full control with flexible user permissions for views and actions",
    icon: (
      <svg
        className="w-8 h-8 text-blue-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z"></path>
        <path d="M5 20v-2a4 4 0 014-4h6a4 4 0 014 4v2"></path>
      </svg>
    ),
  },
{
  id: 3,
  title: "User-Friendly & Responsive Design",
  desc: "Enjoy a smooth, accessible experience on all devices with our intuitive and responsive interface.",
  icon: (
    <svg
      className="w-8 h-8 text-blue-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M4 6h16M4 12h16M4 18h7" />
    </svg>
  ),
},
{
  id: 4,
  title: "Personal AI ChatBot",
  desc: "Get personalized responses and health guidance with your own smart assistant — anytime, anywhere.",
  icon: (
    <svg
      className="w-8 h-8 text-blue-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 3c4.97 0 9 3.582 9 8s-4.03 8-9 8a9.77 9.77 0 01-3-.46l-4 1 1.13-3.4C4.42 14.91 3 13.06 3 11c0-4.418 4.03-8 9-8z" />
    </svg>
  ),
},
{
  id: 5,
  title: "Smart Plan Maker",
  desc: "Like a personal coach, it creates optimal daily routines tailored to your lifestyle and goals.",
  icon: (
    <svg
      className="w-8 h-8 text-blue-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M9 17v-2a4 4 0 014-4h6M13 7h6m-3-3v6" />
      <path d="M5 20h14a2 2 0 002-2v-8a2 2 0 00-2-2H7l-4 4v6a2 2 0 002 2z" />
    </svg>
  ),
},

];
const FeaturesSection = () => {
  return (
    <div className="text-white">
      <NavBar />
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center p-6">
        <section className="max-w-fulltext-white bg-[#161b22] rounded-2xl shadow-2xl max-w-7xl w-full p-10 md:p-16 border border-gray-700 ">
          <div className="max-w-xl">
            <p className="uppercase text-sm text-blue-400 font-semibold mb-2">Features</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 max-w-md">
              The blocks of a powerful platform
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg">
              Our sales team will get in touch to better understand your needs, and
              either help you with the sign-up process.
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 transition rounded-md px-6 py-3 text-white font-semibold">
              Start for free
            </button>
          </div>

          {/* Cards Container */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative">
            {features.map(({ id, title, desc, icon }) => (
              <div
                key={id}
                className={`bg-gray-800 rounded-lg p-6 shadow-md cursor-pointer transform transition duration-300 hover:scale-105`}
                style={id === 2 || id === 4 ? { position: "relative", top: "-2.5rem" } : {}}
              >
                <div className="mb-4">{icon}</div>
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-gray-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default FeaturesSection;