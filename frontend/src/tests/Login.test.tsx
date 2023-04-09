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
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { EmailContext } from "../Context";

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

jest.mock("crypto-js", () => {
  const mockSHA256 = jest.fn().mockImplementation(() => ({
    toString: () =>
      "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f",
  }));
  return {
    SHA256: mockSHA256,
  };
});

describe("Test Login component", () => {
  it("renders without crashing", () => {
    render(<Login />);
    const loginTitle = screen.getByText("Login");
    expect(loginTitle).toBeInTheDocument();
  });

  it("email and password input boxes can be filled correctly", () => {
    render(<Login />);

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
  });

  it("displays an error message when email or password is missing", async () => {
    const updateEmail = jest.fn();
    const email = "";
    (axios.get as jest.Mocked<any>).mockRejectedValue(
      new Error("All fields are required")
    );

    render(
      <EmailContext.Provider value={{ email, updateEmail }}>
        <Login />
      </EmailContext.Provider>
    );

    const submitButton = screen.getByRole("button", { name: "Log In" });
    fireEvent.click(submitButton);

    const errorMessage = await screen.findByText("All fields are required");
    expect(errorMessage).toBeInTheDocument();
  });

  it("displays an error message when email input format is incorrect", async () => {
    render(<Login />);

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, {
      target: { value: "test", name: "email" },
    });
    expect(emailInput.getAttribute("value")).toBe("test");

    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(passwordInput, {
      target: { value: "password", name: "password" },
    });
    expect(passwordInput.getAttribute("value")).toBe("password");

    const submitButton = screen.getByRole("button", { name: "Log In" });
    fireEvent.click(submitButton);

    const errorMessage = await screen.findByText(
      "Please follow the format of email"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("should make a POST request to the correct endpoint", async () => {
    const updateEmail = jest.fn();
    const email = "test@email.com";
    const loginUserData = {
      email: email,
      password: "password123",
    };
    (axios.post as jest.Mock).mockResolvedValue({ data: { resultCode: 200 } });

    render(
      <EmailContext.Provider value={{ email, updateEmail }}>
        <Login />
      </EmailContext.Provider>
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Log In" });

    fireEvent.change(emailInput, { target: { value: loginUserData.email } });
    fireEvent.change(passwordInput, {
      target: { value: loginUserData.password },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("/api/admin/login", {
        ...loginUserData,
        password:
          "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f",
      });
    });
  });

  it("calls navigate function when response from server has result code 200", async () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    const updateEmail = jest.fn();
    const email = "test@email.com";
    render(
      <EmailContext.Provider value={{ email, updateEmail }}>
        <Login />
      </EmailContext.Provider>
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Log In" });
    const responseData = { resultCode: 200 };
    fireEvent.change(emailInput, { target: { value: "test@email.com" } });
    fireEvent.change(passwordInput, { target: { value: "password111" } });
    (
      axios.post as jest.MockedFunction<typeof axios.post>
    ).mockResolvedValueOnce({ data: responseData });
    fireEvent.click(submitButton);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(navigate).toHaveBeenCalledWith("/welcome");
  });

  it("displays an error message when response from server has result code NOT 200", async () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    const updateEmail = jest.fn();
    const email = "test@email.com";
    render(
      <EmailContext.Provider value={{ email, updateEmail }}>
        <Login />
      </EmailContext.Provider>
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Log In" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    const responseData = {
      resultCode: 500,
      data: "Email or password is incorrect.",
    };
    (
      axios.post as jest.MockedFunction<typeof axios.post>
    ).mockResolvedValueOnce({ data: responseData });
    fireEvent.click(submitButton);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(
      screen.getByText("Email or password is incorrect.")
    ).toBeInTheDocument();
  });
});
