import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { useNavigate, BrowserRouter } from "react-router-dom";
import axios from "axios";
import "@testing-library/jest-dom/extend-expect";
import Log from "../components/Log";
import { EmailContext } from "../Context";

jest.mock("axios", () => ({
    get: jest.fn(() => Promise.resolve({ data: {} })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
}));

const user = { firstName: "father", lastName: "admin", balance: 99999999 };
jest.mock("react-router-dom", () => {
    return {
        ...jest.requireActual("react-router-dom"),
        useNavigate: jest.fn(),
        useLocation: () => ({ state: { user } }),
    };
});

const email = "admin@uwaterloo.com";
const updateEmail = jest.fn();
const logs = [
    { email: email, price: 100, quantity: 10, serialNumber: 1, stockSymbol: "AAPL", timeStamp: 1677615749820, type: 1, },
    { email: email, price: 1, quantity: 11, serialNumber: 3, stockSymbol: "AAPL", timeStamp: 1677615749820, type: 1, },
    { email: email, price: 2, quantity: 12, serialNumber: 4, stockSymbol: "AAPL", timeStamp: 1677615749820, type: 1, },
    { email: email, price: 3, quantity: 13, serialNumber: 5, stockSymbol: "AAPL", timeStamp: 1677615749820, type: 1, },
    { email: email, price: 4, quantity: 14, serialNumber: 6, stockSymbol: "AAPL", timeStamp: 1677615749820, type: 1, },
    { email: email, price: 5, quantity: 15, serialNumber: 7, stockSymbol: "AAPL", timeStamp: 1677615749820, type: 1, },
    { email: email, price: 6, quantity: 16, serialNumber: 8, stockSymbol: "AAPL", timeStamp: 1677615749820, type: 1, },
    { email: email, price: 7, quantity: 17, serialNumber: 9, stockSymbol: "AAPL", timeStamp: 1677615749820, type: 1, },
    { email: email, price: 8, quantity: 18, serialNumber: 10, stockSymbol: "AAPL", timeStamp: 1677615749820, type: 1, },
    { email: email, price: 9, quantity: 19, serialNumber: 11, stockSymbol: "AAPL", timeStamp: 1677615749820, type: 1, },
    { email: email, price: 10, quantity: 20, serialNumber: 12, stockSymbol: "AAPL", timeStamp: 1677615749820, type: 1, },
    { email: email, price: 11, quantity: 21, serialNumber: 13, stockSymbol: "AAPL", timeStamp: 1677615749820, type: 1, },
    { email: email, price: 12, quantity: 22, serialNumber: 14, stockSymbol: "AAPL", timeStamp: 1677615749820, type: 1, },
    { email: email, price: 200, quantity: 5, serialNumber: 2, stockSymbol: "GOOG", timeStamp: 1677615749555, type: -1, },
    { email: email, price: 201, quantity: 25, serialNumber: 15, stockSymbol: "GOOG", timeStamp: 1677615749555, type: -1, },
    { email: email, price: 202, quantity: 26, serialNumber: 16, stockSymbol: "GOOG", timeStamp: 1677615749555, type: -1, },
    { email: email, price: 203, quantity: 27, serialNumber: 17, stockSymbol: "GOOG", timeStamp: 1677615749555, type: -1, },
    { email: email, price: 204, quantity: 28, serialNumber: 18, stockSymbol: "GOOG", timeStamp: 1677615749555, type: -1, },
    { email: email, price: 205, quantity: 29, serialNumber: 19, stockSymbol: "GOOG", timeStamp: 1677615749555, type: -1, },
    { email: email, price: 206, quantity: 30, serialNumber: 20, stockSymbol: "GOOG", timeStamp: 1677615749555, type: -1, },
    { email: email, price: 207, quantity: 31, serialNumber: 21, stockSymbol: "GOOG", timeStamp: 1677615749555, type: -1, },
    { email: email, price: 208, quantity: 32, serialNumber: 22, stockSymbol: "GOOG", timeStamp: 1677615749555, type: -1, },
    { email: email, price: 209, quantity: 33, serialNumber: 23, stockSymbol: "GOOG", timeStamp: 1677615749555, type: -1, },
];

describe("Test Log component", () => {
    it("renders Log component", async () => {
        render(
            <EmailContext.Provider value={{ email, updateEmail }}>
                <Log />
            </EmailContext.Provider>
        );
        expect(screen.getByText("Type")).toBeInTheDocument();
        expect(screen.getByText("Stock Symbol")).toBeInTheDocument();
        expect(screen.getByText("Timestamp")).toBeInTheDocument();
        expect(screen.getByText("Price")).toBeInTheDocument();
        expect(screen.getByText("Quantity")).toBeInTheDocument();
        expect(screen.getByText("Go back to welcome")).toBeInTheDocument();
    });

    it("navigates to /welcome when 'Go back to welcome' button is clicked", () => {
        const navigate = jest.fn();
        (useNavigate as jest.Mock).mockReturnValue(navigate);
        render(
            <EmailContext.Provider value={{ email, updateEmail }}>
                <Log />
            </EmailContext.Provider>
        );

        const button = screen.getByRole("button", { name: "Go back to welcome" });
        fireEvent.click(button);
        expect(navigate).toHaveBeenCalledWith("/welcome");
    });

    it("displays error message when resultCode=500 or no data length", async () => {
        (axios.post as jest.Mock).mockResolvedValue({ data: { resultCode: 500 } });
        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith("/api/transaction/log", {
                email
            });
        });

        render(
            <EmailContext.Provider value={{ email, updateEmail }}>
                <Log />
            </EmailContext.Provider>
        );

        const errorMessage = await screen.findByText("No trading log");
        expect(errorMessage).toBeInTheDocument();
    });

    it("displays correct log when resultCode=200n and page change", async () => {
        (axios.post as jest.Mock).mockResolvedValue({ data: { resultCode: 200, data:logs } });
        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith("/api/transaction/log", {
                email
            });
        });

        render(
            <EmailContext.Provider value={{ email, updateEmail }}>
                <Log />
            </EmailContext.Provider>
        );
        
        expect(await screen.findAllByText("buy")).toBeDefined();
        expect(await screen.findAllByText("AAPL")).toBeDefined();
        expect(await screen.findAllByText("100")).toBeDefined();
        expect(await screen.findAllByText("10")).toBeDefined();
        expect(await screen.findAllByText("sell")).toBeDefined();
        expect(await screen.findAllByText("GOOG")).toBeDefined();
        expect(await screen.findAllByText("200")).toBeDefined();
        expect(await screen.findAllByText("5")).toBeDefined();
        
        fireEvent.click(screen.getByRole("button", { name: "Next page" }));
        expect(await screen.queryByText("buy")).toBeNull();
    });
});