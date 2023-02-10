import axios from "axios";
import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));

jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
  };
});

describe("Test Login component", () => {
  it("email and password input boxes can be filled correctly", () => {
    const { getByPlaceholderText } = render(
      <Router>
        <Login />
      </Router>
    );

    const emailInput = getByPlaceholderText("Email");
    fireEvent.change(emailInput, {
      target: { value: "test@example.com", name: "email" },
    });
    expect(emailInput.getAttribute("value")).toBe("test@example.com");

    const passwordInput = getByPlaceholderText("Password");
    fireEvent.change(passwordInput, {
      target: { value: "password", name: "password" },
    });
    expect(passwordInput.getAttribute("value")).toBe("password");
  });

  it("displays an error message when email or password is missing", () => {
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <Login />
      </Router>
    );

    const emailInput = getByPlaceholderText("Email");
    fireEvent.change(emailInput, { target: { value: "", name: "email" } });

    const passwordInput = getByPlaceholderText("Password");
    fireEvent.change(passwordInput, {
      target: { value: "", name: "password" },
    });

    const submitButton = getByText("Log In");
    fireEvent.click(submitButton);

    const errorMessage = getByText("All fields are required");
    expect(errorMessage).toBeDefined();
  });

  it("should make a POST request to the correct endpoint", async () => {
    // Arrange
    const loginUserData = {
      email: "test@email.com",
      password: "password123",
    };
    (axios.post as jest.Mock).mockResolvedValue({ data: { resultCode: 200 } });

    // Act
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <Login />
      </Router>
    );
    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");
    const submitButton = getByText("Log In");

    fireEvent.change(emailInput, { target: { value: loginUserData.email } });
    fireEvent.change(passwordInput, {
      target: { value: loginUserData.password },
    });
    fireEvent.click(submitButton);

    // Assert
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "/api/admin/login",
        loginUserData
      );
    });
  });

  it("calls navigate function when response from server has result code 200", async () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <Login />
      </Router>
    );
    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");
    const submitButton = getByText("Log In");
    const responseData = { resultCode: 200 };
    fireEvent.change(emailInput, { target: { value: "test@email.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    (
      axios.post as jest.MockedFunction<typeof axios.post>
    ).mockResolvedValueOnce({ data: responseData });
    fireEvent.click(submitButton);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(navigate).toHaveBeenCalledWith("/welcome");
  });
  it("calls navigate function when click the signup button", async () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <Login />
      </Router>
    );
    const signupButton = getByText("Don't have an account? Sign up here.")
    fireEvent.click(signupButton);
    expect(navigate).toHaveBeenCalledWith("/Signup");
  });
  
});
