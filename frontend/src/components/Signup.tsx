import React, { useState }  from "react";
import axios from 'axios';

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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [signupUserData, setUserData] = useState<SignupUserData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({ ...signupUserData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('/api/admin/signup', signupUserData);
      console.log(response.data);
      if (response.data.resultCode == 200) {
        handleLogin();
      } else {
        setErrorMessage(response.data.data);
      }
    } catch (error) {
      console.log(error);
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
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <button onClick={handleLogout}>Already have an account? Log in here.</button>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
