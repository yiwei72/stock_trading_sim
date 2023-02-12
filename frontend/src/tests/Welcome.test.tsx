import axios from "axios";
import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import { BrowserRouter, Router, useNavigate, MemoryRouter } from "react-router-dom";
import Welcome from "../components/Welcome";
import { EmailContext, UserAuthContext } from "../Context";

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


  it('updates the first name', async () => {
    (axios.post as jest.Mocked<any>).mockResolvedValue({
      data: {
        data: {
          firstName: "John",
          lastName: "Doe",
          balance: 666,
          holding: []
        },
      },
    });

    const updateFirstName = jest.fn()
    const component = (
      <MemoryRouter>
        <EmailContext.Provider value={{ email: '', updateEmail: jest.fn() }}>
          <UserAuthContext.Provider value={{ firstName: '', updateFirstName }}>
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
});
