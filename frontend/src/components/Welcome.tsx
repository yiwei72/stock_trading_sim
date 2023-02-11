import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { EmailContext, UserAuthContext } from "../Context";
import { useNavigate } from "react-router-dom";

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
  const { email, updateEmail } = useContext(EmailContext);
  const { updateFirstName } = useContext(UserAuthContext);
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
        updateFirstName(data.firstName);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [email, updateFirstName]);

  const navigate = useNavigate();

  const handleClickBuy = () => {
    //navigate("/buy");
    navigate("/buy", { state: { user: user } });
  };

  const handleClickSell = () => {
    navigate("/sell", { state: { user: user } });
  };

  const handleClickLogout = () => {
    updateEmail("");
    updateFirstName("");
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
            <th>Average Price</th>
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
        <button onClick={handleClickBuy} disabled={isLoading}>
          Buy
        </button>
      </div>
      <div>
        <button onClick={handleClickSell} disabled={isLoading}>
          Sell
        </button>
      </div>
      <br></br>
      <div>
        <button onClick={handleClickLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Welcome;
