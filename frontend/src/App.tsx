import React from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Welcome from "./components/Welcome";
import Buy from "./components/Buy";
import Sell from "./components/Sell";
import { EmailProvider, UserAuthProvider } from "./Context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserAuth, LoginAuth } from "./AuthUtil";

const App: React.FC = () => {
  return (
      <EmailProvider>
        <UserAuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/welcome"
                element={
                  <LoginAuth>
                    <Welcome />
                  </LoginAuth>
                }
              />
              <Route
                path="/buy"
                element={
                  <UserAuth>
                    <Buy />
                  </UserAuth>
                }
              />
              <Route
                path="/sell"
                element={
                  <UserAuth>
                    <Sell />
                  </UserAuth>
                }
              />
            </Routes>
          </Router>
        </UserAuthProvider>
      </EmailProvider>
  );
};

export default App;
