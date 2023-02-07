import React, { useState, useContext } from "react";
import axios from "axios";
import { EmailContext } from "../Context";

interface SignupProps {
  handleLogin: () => void;
  handleLogout: () => void;
}

interface SignupUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const Signup: React.FC<SignupProps> = ({ handleLogin, handleLogout }) => {
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
    <div style={{ display: "grid", placeItems: "center", columnGap: 20 }}>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", placeItems: "center", columnGap: 20 }}>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={signupUserData.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={signupUserData.password}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm_password}
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Your First Name"
            name="firstName"
            value={signupUserData.firstName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Your Last Name"
            name="lastName"
            value={signupUserData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ display: "grid", placeItems: "center", columnGap: 20 }}>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <button onClick={handleLogout}>
            Already have an account? Log in here.
          </button>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
