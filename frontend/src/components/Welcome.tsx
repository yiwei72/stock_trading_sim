import React, { useState, useEffect } from "react";

interface Props {
  handleLogout: () => void;
}
interface User {
  firstName: string;
  lastName: string;
  balance: number;
}
interface Stock {
  symbol: string;
  averagePrice: number;
  quantity: number;
  lastUpdated: string;
}
const Welcome: React.FC<Props> = ({ handleLogout }) => {
  const [user, setUser] = useState<User | null>(null);
  const [stocks, setStocks] = useState<Stock[]>([]);

  useEffect(() => {
    // Fetch user data from the backend API
    fetch("https://api.example.com/user")
      .then(response => response.json())
      .then(data => setUser(data));

    // Fetch stock data from the backend API
    fetch("https://api.example.com/stocks")
      .then(response => response.json())
      .then(data => setStocks(data));
  }, []);
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
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map(stock => (
            <tr key={stock.symbol}>
              <td>{stock.symbol}</td>
              <td>{stock.averagePrice}</td>
              <td>{stock.quantity}</td>
              <td>{stock.lastUpdated}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Welcome;
