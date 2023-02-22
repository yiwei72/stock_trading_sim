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

const Buy: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/welcome");
  };

  const [isLoading, setIsLoading] = useState(false);
  const [refreshErrorMessage, setRefreshErrorMessage] = useState("");
  const [buyErrorMessage, setBuyErrorMessage] = useState("");
  const [stockSymbol, setStockSymbol] = useState("");
  const [stockVal, setStockVal] = useState(0);
  const [lastUpdateTime, setLastUpdateTime] = useState("");
  const [amount, setAmount] = useState(0);
  const transactionInfo: TransactionInfo = {
    type: 1,
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
        throw new Error("Buy Amount is required");
      }
      const stockPrice = Number(
        await fetchStockPrice(stockSymbol).catch(console.error)
      );
      setStockVal(stockPrice);
      if (user.balance < stockPrice * amount) {
        throw new Error("Your balance is insufficient");
      }
      transactionInfo.email = email;
      transactionInfo.stockSymbol = stockSymbol.toUpperCase();
      transactionInfo.price = stockPrice;
      transactionInfo.quantity = amount;
      console.log(transactionInfo);
      const response = await axios.post(
        "/api/transaction/buy",
        transactionInfo
      );
      if (response.data.resultCode === 200) {
        navigate("/welcome");
      } else {
        setBuyErrorMessage("Purchase failed");
      }
    } catch (error: any) {
      setBuyErrorMessage(error.message);
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
      setStockVal(
        await fetchStockPrice(stockSymbol.toUpperCase()).catch(console.error)
      );
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
        <label htmlFor="stocksymbol-input">Stock Symbol:</label>
        <input
          id="stocksymbol-input"
          type="text"
          name="stockSymbol"
          value={stockSymbol}
          onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
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
        <label htmlFor="buy-amount-input">Buy Amount:</label>
        <input
          id="buy-amount-input"
          type="number"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        {buyErrorMessage && <p style={{ color: "red" }}>{buyErrorMessage}</p>}
        <button type="submit" disabled={isLoading} onClick={handleSubmit}>
          {isLoading ? "Buying" : "Buy"}
        </button>
        <br></br>
        <button onClick={handleClick}>Go back to welcome</button>
      </div>
    </div>
  );
};

export default Buy;
