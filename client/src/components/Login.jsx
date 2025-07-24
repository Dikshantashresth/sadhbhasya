import React from "react";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();
  const { setUsername, setId, id } = useUserContext();
   const navigate = useNavigate();
  useEffect(()=>{
    if(id){
      navigate(`/router`);
    }
  },[id])
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4000/login", {
        email: Email,
        password : Password,
      },{withCredentials:true});
      if (data) {
        setUsername(data);
        setId(data.id);
        console.log(data);
        navigate(`/router`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="bg-slate-900 h-[100vh] w-full flex justify-center items-center">
      <div className="block text-center h-auto p-4 w-[50vw] md:w-[29vw] lg:w-[22vw] bg-black text-white rounded-2xl shadow-2xl shadow-black">
        <form action="">
          <h1 className="text-2xl font-sans font-semibold mb-6">
            Welcome Back
          </h1>
          <div className="block">
            <input
              type="text"
              className="w-full mb-4 p-2 rounded-lg bg-black border border-white"
              placeholder="email address"
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

            <button onClick={handleSubmit} className="bg-blue-600 text-center text-white w-full p-2 rounded-2xl mb-3">
              Login
            </button>

            <p className="text-xs mb-3">
              Don`t have an account yet?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
