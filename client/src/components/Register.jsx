import React, { useState ,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/context";
import axios from "axios";

const Register = () => {
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const { setUsername: setLoggedInUsername, setId } = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4000/register", {
        username: Username,
        email: Email,
        password: Password,
      });
      console.log({ Username, Email, Password });

      if (data?.id) {
        setLoggedInUsername(Username);
        setId(data.id);
        navigate(`/router`);
      }
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="bg-slate-900 h-[100vh] w-full flex justify-center items-center">
      <div className="block text-center h-auto p-4 w-[50vw] md:w-[29vw] lg:w-[22vw] bg-black text-white rounded-2xl shadow-2xl shadow-black">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-sans font-semibold mb-6">Register</h1>
          <input
            type="text"
            className="w-full mb-4 p-2 rounded-lg bg-black border border-white"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={Username}
            required
          />
          <input
            type="email"
            className="w-full mb-4 p-2 rounded-lg bg-black border border-white"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            value={Email}
            required
          />
          <input
            type="password"
            className="w-full mb-4 p-2 rounded-lg bg-black border border-white"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={Password}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-center text-white w-full p-2 rounded-2xl mb-3"
          >
            Sign up
          </button>
          <p className="text-xs mb-3">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
