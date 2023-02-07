import React, { useState, useEffect } from "react";
import axios from 'axios';


interface Props {
  handleLogin: () => void;
}
interface User {
  firstName: string;
  lastName: string;
  balance: number;
}
interface Stock {
  val: number;
  lastUpdated: string;
}
const Buy: React.FC<Props> = ({ handleLogin }) => {
  const [UserData, setUserData] = useState<User>({
    firstName:'',
    lastName: '',
    balance:0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const[stocksymbol,setstocksymbol]=useState('');
  const[stockval,setstockval]=useState<Stock>({val:0,lastUpdated:""});
  useEffect(() => {
    // Fetch user data from the backend API
    fetch("https://api.example.com/user")
      .then(response => response.json())
      .then(data => setUserData(data));

    
  }, []);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setstocksymbol(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      //maybe some input restriction
      const response = await axios.post('/api/admin/login', stocksymbol);
      console.log(response.data);
      //some handle
        setstockval(response.data);
      if (response.data.resultCode == 200) {
        //get data here
      } else {
        setErrorMessage(response.data.data);
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
        <p>First Name: {UserData.firstName}</p>
        <p>Last Name: {UserData.lastName}</p>
        <p>Balance: {UserData.balance}</p>
       <div>
        <form onSubmit={handleSubmit}>
            <label>Stock Symbol:</label>
            <input 
                    type="text"
                    name="stocksymbol"
                    value={stocksymbol}
                    onChange={handleInputChange}
                    />
        </form>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {!errorMessage&&
        <div>
        <p>stock value:{stockval.val} </p>
        <p>lasupdated:{stockval.lastUpdated}</p>
        </div>}
        <button type="submit" disabled={isLoading}>
            {isLoading ? 'Refreshing' : 'Refresh'}
            </button>
            <form onSubmit={handleSubmit}>
        <label>Stock Symbol:</label>
            <input 
                    type="text"
                    name="stocksymbol"
                    value={stocksymbol}
                    onChange={handleInputChange}
                    />
        <label>Buy Amount:</label>    
            <input 
                    type="text"
                    name="Amounut"
                    value={stocksymbol}
                    onChange={handleInputChange}
                    />
        </form>
        
        <button type="submit" disabled={isLoading}>
        {isLoading ? 'Buying' : 'Buy'}
        </button>
        <br></br>
        <button onClick={handleLogin}>Go back to welcome</button>
      </div>
    </div>
  );
};

export default Buy;
