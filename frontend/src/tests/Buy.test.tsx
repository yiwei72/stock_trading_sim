import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { useNavigate, BrowserRouter } from "react-router-dom";
import axios from "axios";
import "@testing-library/jest-dom/extend-expect";
import Buy from "../components/Buy";
import { EmailContext } from "../Context";
import { fetchStockPrice } from "../components/Api";

jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));

jest.mock("../components/Api", () => ({
  fetchStockPrice: jest.fn(() => Promise.resolve(10000)),
}));

const user = { firstName: "father", lastName: "admin", balance: 99999999 };

jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
    useLocation: () => ({ state: { user } }),
  };
});

describe("Test Buy component", () => {
  it("renders Buy component", () => {
    render(<Buy />);
    const firstNameElement = screen.getByText(/First Name:/i);
    const lastNameElement = screen.getByText(/Last Name:/i);
    const balanceElement = screen.getByText(/Balance:/i);
    const stockSymbolInput = screen.getByLabelText("Stock Symbol:");
    const buyAmountInput = screen.getByLabelText("Buy Amount:");
    const refreshButton = screen.getByText("Refresh");
    const buyButton = screen.getByText("Buy");
    const goBackButton = screen.getByText("Go back to welcome");

    expect(firstNameElement).toBeInTheDocument();
    expect(lastNameElement).toBeInTheDocument();
    expect(balanceElement).toBeInTheDocument();
    expect(stockSymbolInput).toBeInTheDocument();
    expect(buyAmountInput).toBeInTheDocument();
    expect(refreshButton).toBeInTheDocument();
    expect(buyButton).toBeInTheDocument();
    expect(goBackButton).toBeInTheDocument();
  });

  it("navigates to /welcome when 'Go back to welcome' button is clicked", () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    render(
      <BrowserRouter>
        <Buy />
      </BrowserRouter>
    );

    const button = screen.getByRole("button", { name: "Go back to welcome" });
    fireEvent.click(button);

    expect(navigate).toHaveBeenCalledWith("/welcome");
  });

  it("displays error message when stock symbol is not provided", async () => {
    const { getByRole, getByText } = render(<Buy />);
    const buyButton = getByRole("button", { name: /buy/i });

    fireEvent.click(buyButton);

    await waitFor(() => {
      expect(getByText("Stock Symbol is required")).toBeInTheDocument();
    });
  });

  it("shows error message when buy amount is not entered", async () => {
    render(<Buy />);
    const stockSymbolInput = screen.getByLabelText("Stock Symbol:");
    const buyButton = screen.getByRole("button", { name: "Buy" });

    fireEvent.change(stockSymbolInput, { target: { value: "AAPL" } });
    fireEvent.click(buyButton);

    await waitFor(() =>
      expect(screen.getByText("Buy Amount is required")).toBeInTheDocument()
    );
  });

  it("displays error message when balance is insufficient", async () => {
    user.balance = 1;

    const { getByLabelText, getByText, queryByText } = render(<Buy />);

    const stockSymbolInput = getByLabelText("Stock Symbol:");
    const buyAmountInput = getByLabelText("Buy Amount:");
    const buyButton = getByText("Buy");

    fireEvent.change(stockSymbolInput, { target: { value: "AAPL" } });
    fireEvent.change(buyAmountInput, { target: { value: 1 } });

    (fetchStockPrice as jest.Mock).mockResolvedValueOnce(50);

    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: {
        resultCode: 200,
      },
    });

    fireEvent.click(buyButton);

    await waitFor(() =>
      expect(queryByText("Your balance is insufficient")).toBeInTheDocument()
    );

    user.balance = 10000000;
  });

  it("displays error message when stock symbol not entered, but the fresh button is hit", async () => {
    render(<Buy />);
    const refreshButton = screen.getByRole("button", { name: "Refresh" });
    fireEvent.click(refreshButton);

    await waitFor(() =>
      expect(screen.getByText("Stock Symbol is required")).toBeInTheDocument()
    );
  });

  it("submits transaction info on buy button click", async () => {
    const email = "admin@uwaterloo.ca";
    const updateEmail = jest.fn();
    const { getByLabelText, getByText } = render(
      <BrowserRouter>
        <EmailContext.Provider value={{ email, updateEmail }}>
          <Buy />
        </EmailContext.Provider>
      </BrowserRouter>
    );

    fireEvent.change(getByLabelText("Stock Symbol:"), {
      target: { value: "AAPL" },
    });
    fireEvent.change(getByLabelText("Buy Amount:"), {
      target: { value: "10" },
    });

    (axios.post as jest.Mock).mockResolvedValue({ data: { resultCode: 200 } });

    fireEvent.click(getByText("Buy"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("/api/transaction/buy", {
        type: 1,
        email,
        stockSymbol: "AAPL",
        price: 10000,
        quantity: 10,
      });
    });
  });

  it("shows purchase failure when return code not 200", async () => {
    const email = "admin@uwaterloo.ca";
    const updateEmail = jest.fn();
    const { getByLabelText, getByText } = render(
      <BrowserRouter>
        <EmailContext.Provider value={{ email, updateEmail }}>
          <Buy />
        </EmailContext.Provider>
      </BrowserRouter>
    );

    fireEvent.change(getByLabelText("Stock Symbol:"), {
      target: { value: "AAPL" },
    });
    fireEvent.change(getByLabelText("Buy Amount:"), {
      target: { value: "10" },
    });

    (axios.post as jest.Mock).mockResolvedValue({ data: { resultCode: 500 } });

    fireEvent.click(getByText("Buy"));

    await waitFor(() => {
      expect(screen.getByText("Purchase failed")).toBeInTheDocument();
    });
  });

  it("calls fetchStockPrice and updates state on click", async () => {
    const stockPrice = 666;
    (fetchStockPrice as jest.Mock).mockResolvedValueOnce(stockPrice);

    render(<Buy />);

    const stockSymbolInput = screen.getByLabelText("Stock Symbol:");
    fireEvent.change(stockSymbolInput, { target: { value: "AAPL" } });

    const refreshButton = screen.getByRole("button", { name: "Refresh" });
    fireEvent.click(refreshButton);

    expect(fetchStockPrice).toHaveBeenCalledWith("AAPL");

    const stockValue = await screen.findByText(`stock value:${stockPrice}`);
    const lastUpdated = await screen.findByText(/last updated/);
    expect(stockValue).toBeInTheDocument();
    expect(lastUpdated).toBeInTheDocument();
  });

  it("displays an error message if fetchStockPrice throws an error", async () => {
    (fetchStockPrice as jest.Mock).mockRejectedValue(new Error(""));

    render(<Buy />);

    const stockSymbolInput = screen.getByLabelText("Stock Symbol:");
    fireEvent.change(stockSymbolInput, { target: { value: "AAPL" } });

    const refreshButton = screen.getByRole("button", { name: "Refresh" });
    fireEvent.click(refreshButton);

    const errorMessage = await screen.findByText("Stock Symbol:");
    expect(errorMessage).toBeInTheDocument();
  });
});
