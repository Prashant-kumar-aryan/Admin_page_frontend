// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Admin from "./pages/Admin";
import Users from "./pages/Users";
import Resolved from "./pages/Resolved";
import Header from "./components/Header.jsx";
import Feedback from "./pages/Feedback.jsx";

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Admin />} />
      <Route path="/users" element={<Users />} />
      <Route path="/resolved" element={<Resolved />} />
      <Route path="/feedback" element={<Feedback />} />
    </Routes>
  </Router>
);

export default App;
