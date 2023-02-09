import React from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Welcome from "./components/Welcome";
import Buy from "./components/Buy";
import Sell from "./components/Sell";
import { EmailProvider } from "./Context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <EmailProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/sell" element={<Sell />} />
        </Routes>
      </Router>
    </EmailProvider>
  );
};

export default App;
