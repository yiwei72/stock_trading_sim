import React, { useState } from "react";

interface LoginProps {
  handleLogin: () => void;
  handleSignUp: () => void;
}

const Login: React.FC<LoginProps> = ({ handleLogin, handleSignUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-container" style={{ display: "grid", placeItems: "center", columnGap: 20 }}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div style={{ display: "grid", placeItems: "center", columnGap: 20 }}>
        <button onClick={handleLogin}>Log In</button>
        <button onClick={handleSignUp}>Don't have an account? Sign up here.</button>
      </div>
    </div>
  );
};

export default Login;
