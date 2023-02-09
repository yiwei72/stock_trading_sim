import React, { useState, useContext } from "react";
import axios from "axios";
import { EmailContext } from "../Context";
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  handleLogin: () => void;
  handleSignUp: () => void;
}

interface LoginUserData {
  email: string;
  password: string;
}

// interface User {
//   firstName: string;
//   lastName: string;
//   balance: number;
//   holding: StockHolding[];
// }

// interface StockHolding {
//   assetNumber: number;
//   email: string;
//   stockSymbol: string;
//   price: number;
//   quantity: number;
//   timeStamp: number;
// }

// const Login: React.FC = () => {

const Login: React.FC<LoginProps> = ({ handleLogin, handleSignUp }) => {
  const { email, updateEmail } = useContext(EmailContext);
  const [loginUserData, setUserData] = useState<LoginUserData>({
    email: "",
    password: "",
  });
  // const [user, setUser] = useState<User | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // const navigate = useNavigate();

  // const handleClick = () => {
  //   navigate("/Signup");
  // };

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
      
      // const responseLogin = await axios.post('/api/admin/login', loginUserData);
      // console.log(responseLogin.data);
      // if (responseLogin.data.resultCode === 200) {
      //   const responseUser = await axios.post('/api/user/home', { email: loginUserData.email });
      //   setUser(responseUser.data.data);
      //   console.log(user);
      //   navigate("/Welcome", { state: { user: responseUser.data.data } });
      // } else {
      //   setErrorMessage(responseLogin.data.data);
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
          {/* <button onClick={handleClick}>Don't have an account? Sign up here.</button> */}
        </div>
      </form>
    </div>
  );
};

export default Login;
