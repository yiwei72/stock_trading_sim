import React, { useState, useContext } from "react";
import axios from "axios";
import { fetchStockPrice } from "./Api";
import { useNavigate, useLocation } from "react-router-dom";
import { EmailContext } from "../Context";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

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
      setBuyErrorMessage("");
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
      setRefreshErrorMessage("");
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
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{ lineHeight: "3" }}
    >
      <Paper elevation={3} sx={{ p: 8, m: 16 }}>
        <div>
          <Typography variant="h6" gutterBottom>
            <span style={{ color: "#E64250", fontFamily: "inherit" }}>
              First Name:{" "}
            </span>
            <span style={{ fontFamily: "inherit", marginLeft: 8 }}>
              {user.firstName}
            </span>
          </Typography>
          <Typography variant="h6" gutterBottom>
            <span style={{ color: "#E64250", fontFamily: "inherit" }}>
              Last Name:{" "}
            </span>
            <span style={{ fontFamily: "inherit", marginLeft: 8 }}>
              {user.lastName}
            </span>
          </Typography>
          <Typography variant="h6" gutterBottom>
            <span style={{ color: "#E64250", fontFamily: "inherit" }}>
              Balance:
            </span>
            <span style={{ fontFamily: "inherit", marginLeft: 8 }}>
              {user.balance}
            </span>
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <label htmlFor="stocksymbol-input">
                <Typography
                  variant="h6"
                  sx={{ color: "#E64250", htmlFor: "stocksymbol-input" }}
                  gutterBottom
                >
                  Stock Symbol:
                </Typography>
              </label>
            </Grid>
            <Grid item sx={{ display: "flex", alignItems: "center" }}>
              <FormControl
                error={refreshErrorMessage !== ""}
                sx={{ height: "40px" }}
              >
                <TextField
                  id="stocksymbol-input"
                  type="text"
                  size="small"
                  name="stockSymbol"
                  value={stockSymbol}
                  onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
                />
                {refreshErrorMessage && (
                  <Typography variant="body2" color="error">
                    {refreshErrorMessage}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                sx={{
                  color: "#E64250",
                  borderColor: "#E64250",
                  "&:hover, &:focus": { borderColor: "#E64250" },
                }}
                disabled={isLoading}
                onClick={handleClickPrice}
              >
                {isLoading ? "Refreshing" : "Refresh"}
              </Button>
            </Grid>
          </Grid>
          <div>
            <Typography variant="body1" gutterBottom>
              stock value:{stockVal}{" "}
            </Typography>
            <Typography variant="body1" gutterBottom>
              last updated:{lastUpdateTime}
            </Typography>
          </div>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <label htmlFor="buy-amount-input">
                <Typography variant="h6" sx={{ color: "#E64250" }} gutterBottom>
                  Buy Amount:
                </Typography>
              </label>
            </Grid>
            <Grid item sx={{ display: "flex", alignItems: "center" }}>
              <FormControl>
                <TextField
                  id="buy-amount-input"
                  type="number"
                  size="small"
                  name="amount"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
              </FormControl>
            </Grid>
          </Grid>
          {buyErrorMessage && <p style={{ color: "red" }}>{buyErrorMessage}</p>}
          <br></br>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{
                  color: "#fff",
                  bgcolor: "#E64250",
                  "&:hover, &:focus": { bgcolor: "#E64250" },
                }}
                disabled={isLoading}
                onClick={handleSubmit}
                style={{ width: "100%" }}
              >
                {isLoading ? "Buying" : "Buy"}
              </Button>
            </Grid>
          </Grid>
          <Button onClick={handleClick} sx={{ color: "#E64250" }}>
            Go back to welcome
          </Button>
        </div>
      </Paper>
    </Box>
  );
};

export default Buy;
