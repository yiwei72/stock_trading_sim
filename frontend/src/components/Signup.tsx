import React, { useState }  from "react";

interface SignupProps {
  handleLogin: () => void;
  handleLogout: () => void;
}

const Signup: React.FC<SignupProps> = ({ handleLogin, handleLogout }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");

  return (
    <div style={{ display: "grid", placeItems: "center", columnGap: 20 }}>
      <h1>Sign up</h1>
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
      <input
        type="password"
        placeholder="Confirm Password"
        value={password}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Your First Name"
        value={password}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Your Last Name"
        value={password}
        onChange={(e) => setLastName(e.target.value)}
      />
      <div style={{ display: "grid", placeItems: "center", columnGap: 20 }}>
        <button onClick={handleLogout}>Already have an account? Log in here.</button>
        <button onClick={handleLogin}>Confirm Sign up</button>
      </div>
    </div>
  );
};

export default Signup;
