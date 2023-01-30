import React, { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Welcome from "./components/Welcome";

interface Props { }

const App: React.FC<Props> = () => {
  const [page, setPage] = useState("login");

  const handleLogin = () => setPage("welcome");
  const handleLogout = () => setPage("login");
  const handleSignUp = () => setPage("signup")

  return (
    <div>
      {page === "login" && (
        <>
          <Login handleLogin={handleLogin} handleSignUp={handleSignUp}/>
        </>
      )}
      {page === "signup" && (
        <>
          <Signup handleLogin={handleLogin} handleLogout={handleLogout}/>
        </>
      )}
      {page === "welcome" && (
        <Welcome handleLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;
