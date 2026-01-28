import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login";
import Home from "./home";
import Register from "./register"; // make sure path matches filename
import DonateBlood from "./DonateBlood";
import NeedBlood from "./NeedBlood";
import Profile from "./Profile";
import AdminDashboard from "./dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/donate" element={<DonateBlood />} />
        <Route path="/request" element={<NeedBlood />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
