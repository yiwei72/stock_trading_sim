import React, { useState, useContext } from "react";
import axios from "axios";
import { EmailContext } from "../Context";

interface LoginProps {
  handleLogin: () => void;
  handleSignUp: () => void;
}

interface LoginUserData {
  email: string;
  password: string;
}

const Login: React.FC<LoginProps> = ({ handleLogin, handleSignUp }) => {
  const { email, updateEmail } = useContext(EmailContext);
  const [loginUserData, setUserData] = useState<LoginUserData>({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({ ...loginUserData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (!loginUserData.email || !loginUserData.password) {
        throw new Error("All fields are required");
      }
      const response = await axios.post("/api/admin/login", loginUserData);
      console.log(response.data);
      updateEmail(loginUserData.email);
      console.log(email);
      if (response.data.resultCode === 200) {
        handleLogin();
      } else {
        setErrorMessage(response.data.data);
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="login-container"
      style={{ display: "grid", placeItems: "center", columnGap: 20 }}
    >
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", placeItems: "center", columnGap: 20 }}>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={loginUserData.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={loginUserData.password}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ display: "grid", placeItems: "center", columnGap: 20 }}>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging In..." : "Log In"}
          </button>
          <button onClick={handleSignUp}>
            Don't have an account? Sign up here.
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
