import React from "react";
import { useNavigate } from "react-router-dom";

const botOptions = [
  { id: "therapist", name: "Therapist" },
  { id: "fitness", name: "Fitness Coach" },
  { id: "dietcian", name: "Dietician" },
  { id: "medical_expert", name: "Medical Expert" },
];

const ChatSideBar = () => {
  const navigate = useNavigate();

  const handleSelectBot = (bot) => {
    navigate(`/chat/${bot.id}`, { state: { botType: bot.id } });
  };

  return (
    <div className="flex flex-col h-full p-4 bg-black">
      <h2 className="text-2xl font-bold mb-4 text-white">Assistants</h2>

      <div className="space-y-3">
        {botOptions.map((bot) => (
          <button
            key={bot.id}
            onClick={() => handleSelectBot(bot)}
            className="w-full text-left px-4 py-2 bg-black rounded-md border border-white hover:bg-gray-900 text-white transition"
          >
            {bot.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatSideBar;
