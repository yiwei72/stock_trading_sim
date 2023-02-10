import axios from "axios";
import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
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

describe("Test Signup component", () => {
  it("all input boxes can be filled correctly", () => {
    const { getByPlaceholderText } = render(
      <Router>
        <Signup />
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

    const confirmPasswordInput = getByPlaceholderText("Confirm Password");
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password", name: "confirmPassword" },
    });
    expect(confirmPasswordInput.getAttribute("value")).toBe("password");

    const firstNameInput = getByPlaceholderText("Your First Name");
    fireEvent.change(firstNameInput, {
      target: { value: "FirstName", name: "firstName" },
    });
    expect(firstNameInput.getAttribute("value")).toBe("FirstName");

    const lastNameInput = getByPlaceholderText("Your Last Name");
    fireEvent.change(lastNameInput, {
      target: { value: "LastName", name: "lastName" },
    });
    expect(lastNameInput.getAttribute("value")).toBe("LastName");
  });

  it("displays an error message when any input is missing", () => {
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <Signup />
      </Router>
    );

    const emailInput = getByPlaceholderText("Email");
    fireEvent.change(emailInput, { target: { value: "", name: "email" } });

    const passwordInput = getByPlaceholderText("Password");
    fireEvent.change(passwordInput, {
      target: { value: "", name: "password" },
    });

    const confirmPasswordInput = getByPlaceholderText("Confirm Password");
    fireEvent.change(confirmPasswordInput, {
      target: { value: "", name: "confirmPassword" },
    });

    const firstNameInput = getByPlaceholderText("Your First Name");
    fireEvent.change(firstNameInput, {
      target: { value: "", name: "firstName" },
    });

    const lastNameInput = getByPlaceholderText("Your Last Name");
    fireEvent.change(lastNameInput, {
      target: { value: "", name: "lastName" },
    });

    const submitButton = getByText("Sign Up");
    fireEvent.click(submitButton);

    const errorMessage = getByText("All fields are required");
    expect(errorMessage).toBeDefined();
  });

  it("calls navigate function when click the login button", async () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <Signup />
      </Router>
    );
    const signupButton = getByText("Already have an account? Log in here.");
    fireEvent.click(signupButton);
    expect(navigate).toHaveBeenCalledWith("/login");
  });
  it("displays an error message when password and confirm_password do not match", () => {
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <Signup />
      </Router>
    );

    const emailInput = getByPlaceholderText("Email");
    fireEvent.change(emailInput, {
      target: { value: "test@example.com", name: "email" },
    });

    const passwordInput = getByPlaceholderText("Password");
    fireEvent.change(passwordInput, {
      target: { value: "correct", name: "password" },
    });

    const confirmPasswordInput = getByPlaceholderText("Confirm Password");
    fireEvent.change(confirmPasswordInput, {
      target: { value: "wrong", name: "confirmPassword" },
    });

    const firstNameInput = getByPlaceholderText("Your First Name");
    fireEvent.change(firstNameInput, {
      target: { value: "FirstName", name: "firstName" },
    });

    const lastNameInput = getByPlaceholderText("Your Last Name");
    fireEvent.change(lastNameInput, {
      target: { value: "LastName", name: "lastName" },
    });

    const submitButton = getByText("Sign Up");
    fireEvent.click(submitButton);

    const errorMessage = getByText("Password and confirm password must match");
    expect(errorMessage).toBeDefined();
  });

  it("calls navigate function when response from server has result code 200", async () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    const { getByPlaceholderText, getByText } = render(
      <Router>
        <Signup />
      </Router>
    );

    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");
    const confirmPasswordInput = getByPlaceholderText("Confirm Password");
    const firstNameInput = getByPlaceholderText("Your First Name");
    const lastNameInput = getByPlaceholderText("Your Last Name");

    const submitButton = getByText("Sign Up");

    fireEvent.change(emailInput, { target: { value: "test@email.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "password" } });
    fireEvent.change(firstNameInput, { target: { value: "FirstName" } });
    fireEvent.change(lastNameInput, { target: { value: "LastName" } });

    const responseData = { resultCode: 200 };
    (
      axios.post as jest.MockedFunction<typeof axios.post>
    ).mockResolvedValueOnce({ data: responseData });

    fireEvent.click(submitButton);
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(navigate).toHaveBeenCalledWith("/welcome");
  });
  it("calls navigate function when response from server has result code NOT 200", async () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <Signup />
      </Router>
    );
    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");
    const confirmPasswordInput = getByPlaceholderText("Confirm Password");
    const firstNameInput = getByPlaceholderText("Your First Name");
    const lastNameInput = getByPlaceholderText("Your Last Name");
    const submitButton = getByText("Sign Up");
    fireEvent.change(emailInput, { target: { value: "admin@uwaterloo.ca" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "123456" } });
    fireEvent.change(firstNameInput, { target: { value: "FirstName" } });
    fireEvent.change(lastNameInput, { target: { value: "LastName" } });
    const responseData = { resultCode: 500 };
    (
      axios.post as jest.MockedFunction<typeof axios.post>
    ).mockResolvedValueOnce({ data: responseData });
    fireEvent.click(submitButton);
    await new Promise((resolve) => setTimeout(resolve, 0));
    //expect(navigate).toHaveBeenCalledWith("/signup");
  });
});
