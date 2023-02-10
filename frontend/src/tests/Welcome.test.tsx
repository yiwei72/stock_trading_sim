import React from 'react';
import { render, fireEvent, cleanup, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import Welcome from '../components/Welcome';
import { EmailContext } from '../Context';
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import Signup from "../components/Signup";
import { createMemoryHistory } from 'history';

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
  it("click the Buy button and it goes to /buy", async () => {
    const user = {
      firstName: "father",
      lastName: "admin",
      balance: 	100000000,
      holding:  [{
        assetNumber: 1,
        email: "admin@uwaterloo.ca",
        stockSymbol: "AMZN",
        price: 105.15,
        quantity: 300,
        timeStamp: 1494722022853,
      },{
        assetNumber: 1,
        email: "admin@uwaterloo.ca",
        stockSymbol: "META",
        price: 153.12,
        quantity: 100,
        timeStamp: 1494722022853,
      },{
        assetNumber: 1,
        email: "admin@uwaterloo.ca",
        stockSymbol: "MSFT",
        price: 252.75,
        quantity: 200,
        timeStamp: 1494712022853,
      },
    ]
  };
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <Welcome />
      </Router>
    );
    const BuyButton = getByText("Buy");
    fireEvent.click(BuyButton);
   // await new Promise((resolve) => setTimeout(resolve, 0));
    expect(navigate).toHaveBeenCalledWith("/buy");
    //expect(history.location.state).toEqual({ user: user });
  });
  
  it("click the Sell button and it goes to /sell", async () => {
    const user = {
      firstName: "father",
      lastName: "admin",
      balance: 	100000000,
      holding:  [{
        assetNumber: 1,
        email: "admin@uwaterloo.ca",
        stockSymbol: "AMZN",
        price: 105.15,
        quantity: 300,
        timeStamp: 1494722022853,
      },{
        assetNumber: 1,
        email: "admin@uwaterloo.ca",
        stockSymbol: "META",
        price: 153.12,
        quantity: 100,
        timeStamp: 1494722022853,
      },{
        assetNumber: 1,
        email: "admin@uwaterloo.ca",
        stockSymbol: "MSFT",
        price: 252.75,
        quantity: 200,
        timeStamp: 1494712022853,
      },
    ]
  };
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <Welcome />
      </Router>
    );

    const SellButton = getByText("Sell");
    fireEvent.click(SellButton);
   // await new Promise((resolve) => setTimeout(resolve, 0));
    expect(navigate).toHaveBeenCalledWith("/sell", {state: {user}});
  });
  it("click the Logout button and it goes to /login", async () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <Welcome />
      </Router>
    );

    const SellButton = getByText("Logout");
    fireEvent.click(SellButton);
   // await new Promise((resolve) => setTimeout(resolve, 0));
    expect(navigate).toHaveBeenCalledWith("/login");
  });

});
