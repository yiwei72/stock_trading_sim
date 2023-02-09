import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { EmailContext } from "../Context";
import { useNavigate, useLocation } from 'react-router-dom';

interface User {
  firstName: string;
  lastName: string;
  balance: number;
  holding: Array<{
    assetNumber: number;
    email: string;
    stockSymbol: string;
    price: number;
    quantity: number;
    timeStamp: number;
  }>;
}

const Welcome: React.FC = () => {
  const { email } = useContext(EmailContext);
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    balance: 0,
    holding: [],
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchUserData = async () => {
      try {
        const response = await axios.post("/api/user/home", { email: email });
        console.log(email);
        const { data } = response.data;
        console.log(data);
        setUser(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [email]);

  const navigate = useNavigate();

  const handleClickBuy = () => {
    navigate("/buy", { state: { user: user } });
  };

  const handleClickSell = () => {
    navigate("/sell", { state: { user: user } });
  };

  const handleClickLogout = () => {
    navigate("/login");
  };

  return (
    <div>
      {/* User Information Table */}
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {user && (
            <tr>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.balance}</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Stock Information Table */}
      <table>
        <thead>
          <tr>
            <th>Stock Symbol</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {user.holding.map((holding) => (
            <tr key={holding.stockSymbol}>
              <td>{holding.stockSymbol}</td>
              <td>{holding.price}</td>
              <td>{holding.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handleClickBuy} disabled={isLoading}>Buy</button>
      </div>
      <div>
        <button onClick={handleClickSell} disabled={isLoading}>Sell</button>
      </div>
      <br></br>
      <div>
        <button onClick={handleClickLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Welcome;
