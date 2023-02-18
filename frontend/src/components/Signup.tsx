import React, { useState, useContext } from "react";
import axios from "axios";
import { EmailContext } from "../Context";
import { useNavigate } from "react-router-dom";
import './Login.css'
import {HiOutlineMail,HiKey} from "react-icons/hi"

interface SignupUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const Signup: React.FC = () => {
  const { email, updateEmail } = useContext(EmailContext);
  const [confirm_password, setConfirmPassword] = useState("");
  const [signupUserData, setUserData] = useState<SignupUserData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({ ...signupUserData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (
        !signupUserData.email ||
        !signupUserData.password ||
        !confirm_password ||
        !signupUserData.firstName ||
        !signupUserData.lastName
      ) {
        throw new Error("All fields are required");
      }
      if (signupUserData.password !== confirm_password) {
        throw new Error("Password and confirm password must match");
      }
      const response = await axios.post("/api/admin/signup", signupUserData);
      console.log(response.data);
      updateEmail(signupUserData.email);
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
      <div className="signup-container">
       
        <div >
          <h1>Sign up</h1>
          <form onSubmit={handleSubmit}>
            <div >
              <div className="inputbox">
                <HiOutlineMail className="icon"/>
                <input
                  id="email-input"
                  type="text"
                  name="email"
                  value={signupUserData.email}
                  onChange={handleInputChange}
                />
                <label htmlFor="email-input">Email</label>
              </div>
              
              <div className="inputbox">
                <HiKey className="icon"/>
                <input
                  id="password-input"
                  type="password"
                  name="password"
                  value={signupUserData.password}
                  onChange={handleInputChange}
                />
                <label htmlFor="password-input">Password</label>
              </div>
              
              <div className="inputbox">
                <HiKey className="icon"/>
                <input
                  id="confirm-password-input"
                  type="password"
                  value={confirm_password}
                  name="confirmPassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <label htmlFor="confirm-password-input">Confirm Password</label>
              </div>

              <div className="inputbox">
                <input
                  id="firstName"
                  type="text"
                  placeholder="Your First Name" 
                  name="firstName"
                  value={signupUserData.firstName}
                  onChange={handleInputChange}
                />
                <label htmlFor="firstName">Your First Name</label>
              </div>
              
              <div className="inputbox">
                <input
                  id="lastName"
                  type="text"
                  placeholder="Your Last Name"
                  name="lastName"
                  value={signupUserData.lastName}
                  onChange={handleInputChange}
                />
                <label htmlFor="lastName">Your Last Name</label>
              </div>
            </div>
            <div style={{ display: "grid", placeItems: "center", columnGap: 20 }}>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              <button type="submit" disabled={isLoading}>
                {isLoading ? "Signing Up..." : "Sign Up"}
              </button>
              <div className="register">
                <p>Already have an account? 
                <a href="/login">
                  Log in here.
                </a>
                </p> 
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
