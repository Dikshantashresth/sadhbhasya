import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import Chat from "./components/Chat";
import GetForm from "./components/GetForm";
import MainRouter from "./components/MainRouter";
import { UserContextProvider } from "./context/context";

const App = () => {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/chat/:botType" element={<Chat />} />
          <Route path="/dashboard/:user" element={<Dashboard />} />
          <Route path="/getform" element={<GetForm />} />
          <Route path="/router" element={<MainRouter />} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
};

export default App;
