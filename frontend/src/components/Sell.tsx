import React, { useState, useContext } from "react";
import axios from "axios";
import { fetchStockPrice } from "./Api";
import { useNavigate, useLocation } from "react-router-dom";
import { EmailContext } from "../Context";

interface TransactionInfo {
  type: number;
  email: string;
  stockSymbol: string;
  price: number;
  quantity: number;
}

const Sell: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/welcome");
  };

  const [isLoading, setIsLoading] = useState(false);
  const [refreshErrorMessage, setRefreshErrorMessage] = useState("");
  const [sellErrorMessage, setSellErrorMessage] = useState("");
  const [stockSymbol, setStockSymbol] = useState("");
  const [stockVal, setStockVal] = useState(0);
  const [lastUpdateTime, setLastUpdateTime] = useState("");
  const [amount, setAmount] = useState(0);
  const transactionInfo: TransactionInfo = {
    type: -1,
    email: "",
    stockSymbol: "",
    price: 0,
    quantity: 0,
  };

  const {
    state: { user },
  } = useLocation();
  const { email } = useContext(EmailContext);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (!stockSymbol) {
        throw new Error("Stock Symbol is required");
      }
      if (!amount) {
        throw new Error("Sell Amount is required");
      }
      const stock = user.holding.find(
        (stock: { stockSymbol: string }) => stock.stockSymbol === stockSymbol
      );
      if (!stock || stock.quantity < amount) {
        throw new Error("Your stock count is insufficient");
      }
      const stockPrice = Number(
        await fetchStockPrice(stockSymbol).catch(console.error)
      );
      setStockVal(stockPrice);
      console.log("success!");
      transactionInfo.email = email;
      transactionInfo.stockSymbol = stockSymbol;
      transactionInfo.price = stockPrice;
      transactionInfo.quantity = amount;
      const response = await axios.post(
        "/api/transaction/sell",
        transactionInfo
      );
      if (response.data.resultCode === 200) {
        navigate("/welcome");
      } else {
        setSellErrorMessage("Failed to sell");
      }
    } catch (error: any) {
      setSellErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  async function handleClickPrice(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setIsLoading(true);
    try {
      if (!stockSymbol) {
        throw new Error("Stock Symbol is required");
      }
      setStockVal(await fetchStockPrice(stockSymbol).catch(console.error));
      setLastUpdateTime(new Date().toLocaleString());
    } catch (error: any) {
      setRefreshErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      <p>Balance: {user.balance}</p>
      <div>
        <label>Stock Symbol:</label>
        <input
          type="text"
          name="stockSymbol"
          value={stockSymbol}
          onChange={(e) => setStockSymbol(e.target.value)}
        />
        <div>
          <p>stock value:{stockVal} </p>
          <p>last updated:{lastUpdateTime}</p>
        </div>
        {refreshErrorMessage && (
          <p style={{ color: "red" }}>{refreshErrorMessage}</p>
        )}
        <button type="submit" disabled={isLoading} onClick={handleClickPrice}>
          {isLoading ? "Refreshing" : "Refresh"}
        </button>
        <br></br>
        <label>Sell Amount:</label>
        <input
          type="number"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        {sellErrorMessage && <p style={{ color: "red" }}>{sellErrorMessage}</p>}
        <button type="submit" disabled={isLoading} onClick={handleSubmit}>
          {isLoading ? "Selling" : "Sell"}
        </button>
        <br></br>
        <button onClick={handleClick}>Go back to welcome</button>
      </div>
    </div>
  );
};

export default Sell;
