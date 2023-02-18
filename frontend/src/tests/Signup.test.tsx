import axios from "axios";
import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  act,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Router, useNavigate } from "react-router-dom";
import { createMemoryHistory } from "history";
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
    render(<Signup />);

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, {
      target: { value: "test@example.com", name: "email" },
    });
    expect(emailInput.getAttribute("value")).toBe("test@example.com");

    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(passwordInput, {
      target: { value: "password", name: "password" },
    });
    expect(passwordInput.getAttribute("value")).toBe("password");

    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password", name: "confirmPassword" },
    });
    expect(confirmPasswordInput.getAttribute("value")).toBe("password");

    const firstNameInput = screen.getByLabelText("Your First Name");
    fireEvent.change(firstNameInput, {
      target: { value: "FirstName", name: "firstName" },
    });
    expect(firstNameInput.getAttribute("value")).toBe("FirstName");

    const lastNameInput = screen.getByLabelText("Your Last Name");
    fireEvent.change(lastNameInput, {
      target: { value: "LastName", name: "lastName" },
    });
    expect(lastNameInput.getAttribute("value")).toBe("LastName");
  });

  it("displays an error message when any input is missing", async () => {
    render(<Signup />);

    const submitButton = screen.getByRole("button", { name: "Sign Up" });
    fireEvent.click(submitButton);

    const errorMessage = await screen.findByText("All fields are required");
    expect(errorMessage).toBeInTheDocument();
  });

  it("displays an error message when password and confirm_password do not match", async () => {
    render(<Signup />);

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, {
      target: { value: "test@example.com", name: "email" },
    });

    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(passwordInput, {
      target: { value: "correct", name: "password" },
    });

    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    fireEvent.change(confirmPasswordInput, {
      target: { value: "wrong", name: "confirmPassword" },
    });

    const firstNameInput = screen.getByLabelText("Your First Name");
    fireEvent.change(firstNameInput, {
      target: { value: "FirstName", name: "firstName" },
    });

    const lastNameInput = screen.getByLabelText("Your Last Name");
    fireEvent.change(lastNameInput, {
      target: { value: "LastName", name: "lastName" },
    });

    const submitButton = screen.getByRole("button", { name: "Sign Up" });
    fireEvent.click(submitButton);

    const errorMessage = await screen.findByText(
      "Password and confirm password must match"
    );
    expect(errorMessage).toBeDefined();
  });

  it("calls navigate function when response from server has result code 200", async () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    render(<Signup />);

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const firstNameInput = screen.getByLabelText("Your First Name");
    const lastNameInput = screen.getByLabelText("Your Last Name");
    const submitButton = screen.getByRole("button", { name: "Sign Up" });

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
    render(<Signup />);

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const firstNameInput = screen.getByLabelText("Your First Name");
    const lastNameInput = screen.getByLabelText("Your Last Name");
    const submitButton = screen.getByRole("button", { name: "Sign Up" });
    fireEvent.change(emailInput, { target: { value: "admin@uwaterloo.ca" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "123456" } });
    fireEvent.change(firstNameInput, { target: { value: "FirstName" } });
    fireEvent.change(lastNameInput, { target: { value: "LastName" } });
    const responseData = { resultCode: 500, data: "User already exists." };
    (
      axios.post as jest.MockedFunction<typeof axios.post>
    ).mockResolvedValueOnce({ data: responseData });
    fireEvent.click(submitButton);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(screen.getByText("User already exists.")).toBeInTheDocument();
  });
});
