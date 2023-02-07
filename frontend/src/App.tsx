import React, { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Welcome from "./components/Welcome";
import Buy from "./components/Buy";
import Sell from "./components/Sell";

interface Props { }

const App: React.FC<Props> = () => {
  const [page, setPage] = useState("login");

  const handleLogin = () => setPage("welcome");
  const handleLogout = () => setPage("login");
  const handleSignUp = () => setPage("signup")
  const handleBuy = () => setPage("Buy")
  const handleSell = () => setPage("Sell")
  
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
        <Welcome handleLogout={handleLogout} handleBuy={handleBuy} handleSell={handleSell}/>
      )}
      {page === "Buy" && (
        <Buy handleLogin={handleLogin} />
      )}
      {page === "Sell" && (
        <Sell handleLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
