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
  const sampleUser: User = {
    firstName: "",
    lastName: "",
    balance: 0
  };
  const samplestock: Stock = {
    symbol: "",
    averagePrice:0 ,
    quantity: 0,
    lastUpdated: ""
  };
  const stock1: Stock[] = [samplestock];
  
  const [user, setUser] = useState<User>({...sampleUser});
  const [stocks, setStocks] = useState<Stock[]>([...stock1]);

  
  // setUser(sampleUser); same bug
  // const stock1: Stock[] = [samplestock];
  // setStocks(stock1) has bug
  
  // useEffect(() => {
  //   // Fetch user data from the backend API
  //   fetch("https://api.example.com/user")
  //     .then(response => response.json())
  //     .then(data => setUser(data));

  //   // Fetch stock data from the backend API
  //   fetch("https://api.example.com/stocks")
  //     .then(response => response.json())
  //     .then(data => setStocks(data));
  // }, []);

  return (
    // <h1>what is gongig on</h1>
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

// const Welcome: React.FC<Props> = ({ handleLogout }) => {
//   return (
//     <div>
//       <h1>Welcome</h1>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

export default Welcome;
