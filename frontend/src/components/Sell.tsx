import React, { useState } from "react";
// import axios from "axios";
import { fetchStockPrice } from "./Api";
import { useNavigate, useLocation } from 'react-router-dom';

// interface User {
//   firstName: string;
//   lastName: string;
//   balance: number;
// }
// interface Stock {
//   val: number;
//   lastUpdated: string;
// }

const Sell: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/welcome");
  };

  // const [UserData, setUserData] = useState<User>({
  //   firstName: "",
  //   lastName: "",
  //   balance: 0,
  // });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [stockSymbol, setStockSymbol] = useState("");
  const [stockVal, setStockVal] = useState(0);
  const [lastUpdateTime, setLastUpdateTime] = useState("");
  const [amount, setAmount] = useState(0);
  // useEffect(() => {
  //   // Fetch user data from the backend API
  //   fetch("https://api.example.com/user")
  //     .then((response) => response.json())
  //     .then((data) => setUserData(data));
  // }, []);
  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = event.target;
  //   setstocksymbol(value);
  // };

  const { state: { user } } = useLocation();

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   setIsLoading(true);

  //   try {
  //     //maybe some input restriction
  //     const response = await axios.post("/api/admin/login", stockSymbol);
  //     console.log(response.data);
  //     //some handle
  //     setStockVal(response.data);
  //     if (response.data.resultCode === 200) {
  //       //get data here
  //     } else {
  //       setErrorMessage(response.data.data);
  //     }
  //   } catch (error: any) {
  //     setErrorMessage(error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
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
      setErrorMessage(error.message);
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
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {!errorMessage && (
          <div>
            <p>stock value:{stockVal} </p>
            <p>last updated:{lastUpdateTime}</p>
          </div>
        )}
        <button type="submit" disabled={isLoading} onClick={handleClickPrice}>
          {isLoading ? "Refreshing" : "Refresh"}
        </button>
        <br></br>
        <label>Buy Amount:</label>
        <input
          type="number"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Selling" : "Sell"}
        </button>
        <br></br>
        <button onClick={handleClick}>Go back to welcome</button>
      </div>
    </div>
  );
};

export default Sell;
