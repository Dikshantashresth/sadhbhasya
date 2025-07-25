import React from "react";
import NavBar from "../components/NavBar";

const team = [
  {
    name: "Dikshanta Shrestha",
    role: "Full Stack & Lead Developer",
    image: "https://i.pravatar.cc/150?img=32",
    bio: "Passionate about blending healthcare with technology. Built this platform to improve health access and user experience."
  },
  {
    name: "Furi Lama",
    role: "Frontend Developer",
    image: "https://i.pravatar.cc/150?img=5",
    bio: "Loves secure and scalable systems. Handles data integrity, user authentication, and API integration with precision."
  },
  {
    name: "Ishan Sitaula",
    role: "Forntend Developer",
    image: "https://i.pravatar.cc/150?img=47",
    bio: "Crafts intuitive interfaces with a focus on usability. Brings a clean, accessible design to every pixel."
  },
  {
    name: "Samir Gurung",
    role: "Frontend Developer",
    image: "https://i.pravatar.cc/150?img=15",
    bio: "Turns ideas into fast, responsive web apps. Specializes in React and loves building sleek interfaces."
  }
];

const AboutPage = () => {
  return (
    <div className="text-white">
      <NavBar />
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center p-6">
        <div className="bg-[#161b22] rounded-2xl shadow-2xl max-w-7xl w-full p-10 md:p-16 border border-gray-700">
          {/* Website Info */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-6">About Our Healthcare Platform</h1>
            <p className="text-gray-400 mb-4 text-lg leading-relaxed">
              Our healthcare platform connects users with helpful information and responsive support.
              Designed with care and crafted using modern web technologies, it ensures speed, simplicity, and security.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              With a powerful team of developers behind it, this project is committed to transforming how people interact with digital health services.
            </p>
          </div>

          {/* Creator/Team Info */}
          <div>
            <h2 className="text-3xl font-semibold text-white mb-8 text-center">Meet the Developers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="bg-[#1c212a] p-6 rounded-xl text-center shadow-md border border-gray-700 hover:scale-[1.02] transition"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 mx-auto rounded-full border-4 border-gray-600 mb-4"
                  />
                  <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                  <p className="text-sm uppercase text-gray-400 mb-2 tracking-wider">{member.role}</p>
                  <p className="text-sm text-gray-500">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutPage;