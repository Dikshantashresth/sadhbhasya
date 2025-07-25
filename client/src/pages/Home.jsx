// src/pages/HomePage.jsx
import React from "react";
import Navbar from "../components/NavBar";
import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <Navbar /> {/* Navigation bar component */}

      {/* Hero Section */}
      <div className="min-h-screen pt-6">

      <section className="flex flex-col md:flex-row items-center justify-between rounded-2xl shadow-2xl max-w-7xl m-auto  p-10 md:p-16 border border-gray-700 bg-[#161b22]">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Smart health advice in your pocket. AI care made simple
          </h2>
          <p className="text-lg mb-6 text-gray-300">
            Welcome to a new era of personalized wellness. Our platform goes beyond basic advice — we analyze your user biodata to deliver AI-powered health suggestions tailored just for you.
            <br />
            🧠 From checking your sleep routines and identifying unhealthy patterns to helping you set and achieve your daily goals, our intelligent system works like a personal wellness coach.
          </p>
          <Link to='/login'>
          <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
            Try Chat Assistant
          </button></Link>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://img.freepik.com/free-vector/ai-medical-chatbot-vector-illustration_53876-127995.jpg"
            alt="Health Care AI Assistant"
            className="rounded-xl w-full max-w-md mx-auto"
          />
        </div>
      </section>

      {/* Chat Assistant Preview */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-[#161b22] p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-blue-400">AI Assistant Preview</h3>
          <div className="bg-gray-600 p-4 rounded-md h-48 overflow-y-auto text-gray-100">
            <p><strong>You:</strong> I have a headache and feel dizzy.</p>
            <p className="mt-2"><strong>AI:</strong> I'm sorry to hear that. It might be due to dehydration, stress, or a cold. Would you like some self-care tips or talk to a doctor?</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-black py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h4 className="text-lg font-bold text-blue-400">24/7 Availability</h4>
            <p className="text-sm mt-2 text-gray-300">Get health advice any time you need, day or night.</p>
          </div>
          <div>
            <h4 className="text-lg font-bold text-blue-400">Smart & Personalized</h4>
            <p className="text-sm mt-2 text-gray-300">AI learns and adapts to provide better responses over time.</p>
          </div>
          <div>
            <h4 className="text-lg font-bold text-blue-400">Secure & Private</h4>
            <p className="text-sm mt-2 text-gray-300">All your data is encrypted and kept confidential.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-900 py-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-6 text-blue-400">What Users Say</h3>
          <p className="text-gray-300 italic">"This AI assistant helped me avoid unnecessary panic during flu symptoms. Amazing support!"</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-center text-sm text-gray-500 py-4 mt-8 border-t border-gray-800">
        &copy; 2025 Sadhbhyasa. All rights reserved.
      </footer>
      </div>
    </div>
  );
};

export default HomePage;