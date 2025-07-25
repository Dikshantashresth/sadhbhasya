import React, { useState, useEffect, useRef } from "react";
import ChatSideBar from "./ChatSideBar";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import Loader from "./Loader";
import { useUserContext } from "../context/context";
import RenderMessage from "./RenderMessage";
const socket = io("http://localhost:4000");

const Chat = () => {
  const location = useLocation();
  const botType = location?.state?.botType || "general"; // fallback if not found
  const {username} = useUserContext();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    socket.on("get_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("get_message");
  }, []);
  useEffect(() => {
  
  setMessages([]);
}, [botType])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = message;
    setMessages((prev) => [...prev, { sender: "user", content: userMessage }]);
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:4000/chat/send", {
        message: userMessage,
        botType, // important!
      });

      if (res.data.reply) {
        setMessages((prev) => [...prev, { sender: "ai", content: res.data.reply }]);
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setMessages((prev) => [...prev, { sender: "ai", content: "Error: Failed to get response." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-gray-950 border-r border-white  text-white">
        <ChatSideBar />
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-col flex-grow bg-slate-950 p-4 text-white">
        {/* Top Bar */}
        <div className="text-xl font-semibold mb-4 border-b pb-2 border-gray-700 flex items-center justify-start">
          <Link to={`/dashboard/${username}`}>
            <button className="p-1 rounded hover:bg-gray-800">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          </Link>
          <span className="ml-2 capitalize">{botType} </span>
        </div>

        {/* Messages */}
      <div className="flex-grow overflow-y-auto mb-4 space-y-2 pr-2 flex flex-col">
  {messages.map((msg, index) => (
    <div
      key={index}
      className={`p-3 rounded-md max-w-2xl whitespace-pre-wrap text-sm md:text-base leading-relaxed ${
        msg.sender === "user" ? "self-end bg-blue-600 text-white" : "self-start bg-black text-gray-200"
      }`}
    >
      <RenderMessage content={msg.content} />
    </div>
  ))}

  {loading && (
    <div className="self-start">
      <Loader />
    </div>
  )}
  <div ref={messagesEndRef} />
</div>


        {/* Input */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={1}
            placeholder="Enter message..."
            className="flex-grow px-4 py-2 rounded-md border border-gray-700 bg-black text-white resize-none"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 hover:bg-blue-600 rounded-md"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
