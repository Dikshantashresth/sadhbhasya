import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUserContext } from "../context/context";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { username, setUsername, id } = useUserContext();
  const [newUsername, setNewUsername] = useState(username);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setNewUsername(username);
  }, [username]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:4000/update-profile",
        {
          userId: id,
          newUsername: newUsername.trim(),
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        setUsername(newUsername);
        setMessage("Username updated successfully!");
        navigate(`/dashboard/${newUsername}`);
      } else {
        setMessage("Update failed: " + res.data.message);
      }
    } catch (err) {
      setMessage("Something went wrong: " + err.message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-10 bg-zinc-950 shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-white">Settings</h2>
      <form onSubmit={handleUpdate}>
        <label className="block mb-2 text-white">Change Username:</label>
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          className="w-full px-3 py-2 mb-4 border rounded text-white"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Update
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default Settings;
