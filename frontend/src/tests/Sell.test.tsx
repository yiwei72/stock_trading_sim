import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { useNavigate, BrowserRouter } from "react-router-dom";
import axios from "axios";
import "@testing-library/jest-dom/extend-expect";
import Sell from "../components/Sell";
import { EmailContext } from "../Context";
import { fetchStockPrice } from "../components/Api";

jest.mock("axios", () => ({
    get: jest.fn(() => Promise.resolve({ data: {} })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
}));

jest.mock("../components/Api", () => ({
    fetchStockPrice: jest.fn(() => Promise.resolve(10000))
}))

const user = { firstName: "father", lastName: "admin", balance: 99999999,
               holding:[{
                assetNumber: 1,
                email: "admin@uwaterloo.ca",
                price: 10,
                quantity: 1,
                stockSymbol: "AAPL",
                timeStamp: 1677022981393}] };


jest.mock("react-router-dom", () => {
    return {
        ...jest.requireActual("react-router-dom"),
        useNavigate: jest.fn(),
        useLocation: () => ({ state: { user } })
    };
});


describe("Test Sell component", () => {
    it("renders Sell component", () => {
        render(<Sell />);
        const firstNameElement = screen.getByText(/First Name:/i);
        const lastNameElement = screen.getByText(/Last Name:/i);
        const balanceElement = screen.getByText(/Balance:/i);
        const stockSymbolInput = screen.getByLabelText("Stock Symbol:");
        const sellAmountInput = screen.getByLabelText("Sell Amount:");
        const refreshButton = screen.getByText("Refresh");
        const sellButton = screen.getByText("Sell");
        const goBackButton = screen.getByText("Go back to welcome");

        expect(firstNameElement).toBeInTheDocument();
        expect(lastNameElement).toBeInTheDocument();
        expect(balanceElement).toBeInTheDocument();
        expect(stockSymbolInput).toBeInTheDocument();
        expect(sellAmountInput).toBeInTheDocument();
        expect(refreshButton).toBeInTheDocument();
        expect(sellButton).toBeInTheDocument();
        expect(goBackButton).toBeInTheDocument();
    });

    it("navigates to /welcome when 'Go back to welcome' button is clicked", () => {
        const navigate = jest.fn();
        (useNavigate as jest.Mock).mockReturnValue(navigate);

        render(
            <BrowserRouter>
                <Sell />
            </BrowserRouter>
        );

        const button = screen.getByRole("button", { name: "Go back to welcome" });
        fireEvent.click(button);

        expect(navigate).toHaveBeenCalledWith("/welcome");
    });

    it("displays error message when stock symbol is not provided", async () => {
        const { getByRole, getByText } = render(<Sell />);
        const sellButton = getByRole("button", { name: /Sell/i });

        fireEvent.click(sellButton);

        await waitFor(() => {
            expect(getByText("Stock Symbol is required")).toBeInTheDocument();
        });
    });

    it("shows error message when sell amount is not entered", async () => {
        render(<Sell />);
        const stockSymbolInput = screen.getByLabelText("Stock Symbol:");
        const sellButton = screen.getByRole("button", { name: "Sell" });

        fireEvent.change(stockSymbolInput, { target: { value: "AAPL" } });
        fireEvent.click(sellButton);

        await waitFor(() =>
            expect(screen.getByText("Sell Amount is required")).toBeInTheDocument()
        );
    });

    it("displays error message when stock count is insufficient", async () => {
        const { getByLabelText, getByText } = render(
            <Sell />
        );

        const stockSymbolInput = getByLabelText("Stock Symbol:");
        const sellAmountInput = getByLabelText("Sell Amount:");
        const sellButton = getByText("Sell");

        fireEvent.change(stockSymbolInput, { target: { value: "AAPL" } });
        fireEvent.change(sellAmountInput, { target: { value: 5 } });

        (axios.post as jest.Mock).mockResolvedValueOnce({
            data: {
                resultCode: 200,
            },
        });

        fireEvent.click(sellButton);

        await waitFor(() =>
            expect(screen.getByText("Your stock count is insufficient")).toBeInTheDocument()
        );
    });

    it("displays error message when stock symbol not entered, but the fresh button is hit", async () => {
        render(<Sell />);
        const refreshButton = screen.getByRole("button", { name: "Refresh" });
        fireEvent.click(refreshButton);

        await waitFor(() =>
            expect(screen.getByText("Stock Symbol is required")).toBeInTheDocument()
        );
    });

    it("submits transaction info on sell button click", async () => {
        const email = "admin@uwaterloo.ca";
        const updateEmail = jest.fn();
        const { getByLabelText, getByText } = render(
            <BrowserRouter>
                <EmailContext.Provider value={{ email, updateEmail }}>
                    <Sell />
                </EmailContext.Provider>
            </BrowserRouter>
        );

        fireEvent.change(getByLabelText("Stock Symbol:"), {
            target: { value: "AAPL" },
        });
        fireEvent.change(getByLabelText("Sell Amount:"), {
            target: { value: "1" },
        });

        (axios.post as jest.Mock).mockResolvedValue({ data: { resultCode: 200 } });

        fireEvent.click(getByText("Sell"));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith("/api/transaction/sell", {
                type: -1,
                email,
                stockSymbol: "AAPL",
                price: 10000,
                quantity: 1,
            });
        });
    });

    it("shows Failed to sell when return code not 200", async () => {
        const email = "admin@uwaterloo.ca";
        const updateEmail = jest.fn();
        const { getByLabelText, getByText } = render(
            <BrowserRouter>
                <EmailContext.Provider value={{ email, updateEmail }}>
                    <Sell />
                </EmailContext.Provider>
            </BrowserRouter>
        );

        fireEvent.change(getByLabelText("Stock Symbol:"), {
            target: { value: "AAPL" },
        });
        fireEvent.change(getByLabelText("Sell Amount:"), {
            target: { value: "1" },
        });

        (axios.post as jest.Mock).mockResolvedValue({ data: { resultCode: 500 } });

        fireEvent.click(getByText("Sell"));

        await waitFor(() => {
            expect(screen.getByText("Failed to sell")).toBeInTheDocument()
        });
    });

    it("calls fetchStockPrice and updates state on click", async () => {
        const stockPrice = 666;
        (fetchStockPrice as jest.Mock).mockResolvedValueOnce(stockPrice);
    
        render(<Sell />);
    
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
});
