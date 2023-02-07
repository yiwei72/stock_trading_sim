import axios from "axios";
import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import Signup from "../components/Signup";

jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));

describe("Test Signup component", () => {
  it("all input boxes can be filled correctly", () => {
    const handleLogin = jest.fn();
    const handleLogout = jest.fn();
    const { getByPlaceholderText } = render(
      <Signup handleLogin={handleLogin} handleLogout={handleLogout} />
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
    const handleLogin = jest.fn();
    const handleLogout = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <Signup handleLogin={handleLogin} handleLogout={handleLogout} />
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

  it("displays an error message when password and confirm_password do not match", () => {
    const handleLogin = jest.fn();
    const handleLogout = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <Signup handleLogin={handleLogin} handleLogout={handleLogout} />
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
});
