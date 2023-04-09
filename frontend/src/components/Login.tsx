import React, { useState, useContext } from "react";
import axios from "axios";
import { EmailContext } from "../Context";
import { useNavigate } from "react-router-dom";
import { HiOutlineMail, HiKey } from "react-icons/hi";
import "./Login.css";
import * as CryptoJS from "crypto-js";

interface LoginUserData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { email, updateEmail } = useContext(EmailContext);
  const [loginUserData, setUserData] = useState<LoginUserData>({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({ ...loginUserData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    try {
      if (!loginUserData.email || !loginUserData.password) {
        throw new Error("All fields are required");
      }
      if (!emailRegex.test(loginUserData.email)) {
        throw new Error("Please follow the format of email");
      }
      const hashedPassword = CryptoJS.SHA256(loginUserData.password).toString();
      const updatedLoginUserData = {
        ...loginUserData,
        password: hashedPassword,
      };
      const response = await axios.post(
        "/api/admin/login",
        updatedLoginUserData
      );
      console.log(response.data);
      updateEmail(loginUserData.email);
      console.log(email);
      if (response.data.resultCode === 200) {
        navigate("/welcome");
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
    <section>
      <div
        className="login-container"
        // style={{ display: "grid", placeItems: "center", columnGap: 20 }}
      >
        {/* <h1>Login</h1> */}
        <div className="form-value">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <div className="inputbox">
                <HiOutlineMail className="icon" />
                <input
                  id="email-input"
                  type="text"
                  name="email"
                  value={loginUserData.email}
                  onChange={handleInputChange}
                />
                <label htmlFor="email-input">Email</label>
              </div>

              <div className="inputbox">
                <HiKey className="icon" />
                <input
                  id="password-input"
                  type="password"
                  name="password"
                  value={loginUserData.password}
                  placeholder="8+ with numbers and letters"
                  onChange={handleInputChange}
                />
                <label htmlFor="password-input">Password</label>
              </div>
            </div>
            <div
              style={{ display: "grid", placeItems: "center", columnGap: 20 }}
            >
              {errorMessage && <p style={{ color: "blue" }}>{errorMessage}</p>}
              <button type="submit" disabled={isLoading}>
                {isLoading ? "Logging In..." : "Log In"}
              </button>
              {/* <button onClick={handleClick}>
                Don't have an account? Sign up here.
              </button> */}
              <div className="register">
                <p>
                  Don't have a account?
                  <a href="/signup">Register</a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
