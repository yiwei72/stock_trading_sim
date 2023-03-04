import axios from "axios";
import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import {
  BrowserRouter,
  Router,
  useNavigate,
  MemoryRouter,
} from "react-router-dom";
import Welcome from "../components/Welcome";
import { EmailContext, UserAuthContext } from "../Context";

jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));

jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn().mockReturnValue(jest.fn()),
  };
});

const user = {
  firstName: "father",
  lastName: "admin",
  balance: 100000000,
  holding: [
    {
      assetNumber: 1,
      email: "admin@uwaterloo.ca",
      stockSymbol: "AAPL",
      price: 200,
      quantity: 5,
      timeStamp: 1494722022853,
    },
  ],
};

describe("Test Welcome component", () => {
  it("click the Logout button and it goes to /login", async () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    const { getByPlaceholderText, getByText } = render(
      <BrowserRouter>
        <Welcome />
      </BrowserRouter>
    );
    const SellButton = getByText("Logout");
    fireEvent.click(SellButton);
    expect(navigate).toHaveBeenCalledWith("/login");
  });

  it("updates the first name", async () => {
    (axios.post as jest.Mocked<any>).mockResolvedValue({
      data: { data: user },
    });

    const updateFirstName = jest.fn();
    const component = (
      <MemoryRouter>
        <EmailContext.Provider value={{ email: "", updateEmail: jest.fn() }}>
          <UserAuthContext.Provider value={{ firstName: "", updateFirstName }}>
            <Welcome />
          </UserAuthContext.Provider>
        </EmailContext.Provider>
      </MemoryRouter>
    );

    await act(async () => {
      render(component);
    });

    expect(updateFirstName).toHaveBeenCalled();
  });

  it("should navigate to /buy when Buy button is clicked", async () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    (axios.post as jest.Mock).mockResolvedValue({
      data: { data: user },
    });

    const component = (
      <MemoryRouter>
        <EmailContext.Provider value={{ email: "", updateEmail: jest.fn() }}>
          <UserAuthContext.Provider
            value={{ firstName: "", updateFirstName: jest.fn() }}
          >
            <Welcome />
          </UserAuthContext.Provider>
        </EmailContext.Provider>
      </MemoryRouter>
    );

    await act(async () => {
      const { getByText } = render(component);
      fireEvent.click(getByText("Buy"));
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(navigate).toHaveBeenCalledWith("/buy", {
        state: {
          user: { balance: 0, firstName: "", lastName: "", holding: [] },
        },
      });
    });
  });

  it("should navigate to /sell when Sell button is clicked", async () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    (axios.post as jest.Mock).mockResolvedValue({
      data: { data: user },
    });

    const component = (
      <MemoryRouter>
        <EmailContext.Provider value={{ email: "", updateEmail: jest.fn() }}>
          <UserAuthContext.Provider
            value={{ firstName: "", updateFirstName: jest.fn() }}
          >
            <Welcome />
          </UserAuthContext.Provider>
        </EmailContext.Provider>
      </MemoryRouter>
    );

    await act(async () => {
      const { getByText } = render(component);
      fireEvent.click(getByText("Sell"));
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(navigate).toHaveBeenCalledWith("/sell", {
        state: {
          user: { balance: 0, firstName: "", lastName: "", holding: [] },
        },
      });
    });
  });

  it("should navigate to /log when Log button is clicked", async () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    (axios.post as jest.Mock).mockResolvedValue({
      data: { data: user },
    });

    const component = (
      <MemoryRouter>
        <EmailContext.Provider value={{ email: "", updateEmail: jest.fn() }}>
          <UserAuthContext.Provider
            value={{ firstName: "", updateFirstName: jest.fn() }}
          >
            <Welcome />
          </UserAuthContext.Provider>
        </EmailContext.Provider>
      </MemoryRouter>
    );

    await act(async () => {
      const { getByText } = render(component);
      fireEvent.click(getByText("Log"));
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(navigate).toHaveBeenCalledWith("/log", {
        state: {
          user: { balance: 0, firstName: "", lastName: "", holding: [] },
        },
      });
    });
  });
});
