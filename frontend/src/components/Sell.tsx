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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

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
  const [orderType, setOrderType] = useState<string>("market");
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
      setSellErrorMessage("");
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
      setRefreshErrorMessage("");
      fetchStockPrice(stockSymbol.toUpperCase())
        .then((stockPrice) => {
          setStockVal(Number(stockPrice));
          setLastUpdateTime(new Date().toLocaleString());
        })
        .catch(console.error);
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
                <Typography variant="h6" sx={{ color: "#E64250" }} gutterBottom>
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
              <label htmlFor="sell-amount-input">
                <Typography variant="h6" sx={{ color: "#E64250" }} gutterBottom>
                  Sell Amount:
                </Typography>
              </label>
            </Grid>
            <Grid item sx={{ display: "flex", alignItems: "center" }}>
              <FormControl>
                <TextField
                  id="sell-amount-input"
                  type="number"
                  size="small"
                  name="amount"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
              </FormControl>
            </Grid>
          </Grid>
          {sellErrorMessage && (
            <p style={{ color: "red" }}>{sellErrorMessage}</p>
          )}
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
                {isLoading ? "Selling" : "Sell"}
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <InputLabel htmlFor="order-type-select">
                <Typography variant="h6" sx={{ color: "#E64250" }} gutterBottom>
                  Order Type:
                </Typography>
              </InputLabel>
            </Grid>
            <Grid item>
              <FormControl sx={{ minWidth: 120 }}>
                <Select
                  id="order-type-select"
                  data-testid="order-type-select"
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value as string)}
                >
                  <MenuItem value="market">Market</MenuItem>
                  <MenuItem value="limit">Limit</MenuItem>
                  <MenuItem value="stop">Stop</MenuItem>
                </Select>
              </FormControl>
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

export default Sell;
export enum OrderType {
  Limit = "limit",
  Market = "market",
  Stop = "stop",
}
