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
  //triggerPrice: number | null;
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
    //triggerPrice: 0,
  };
  const [unfilledTriggerPrices, setUnfilledTriggerPrices] = useState<number[]>(
    []
  );

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
      //transactionInfo.triggerPrice = triggerPrice;

      if (orderType === "market") {
        // Existing logic for market orders
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
      } else if (orderType === "limit" || orderType === "stop") {
        // Logic for limit or stop orders
        // Store the unfilled order and display it on the same page
        setUnfilledOrders((prevOrders) => [...prevOrders, transactionInfo]);
        setUnfilledTriggerPrices((prevTriggerPrices) => [
          ...prevTriggerPrices,
          triggerPrice || 0,
        ]);
      } else {
        throw new Error("Invalid order type");
      }
    } catch (error: any) {
      setBuyErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const [orderType, setOrderType] = useState<string>("market");
  const [triggerPrice, setTriggerPrice] = useState<number | null>(null);
  const [triggerPriceError, setTriggerPriceError] = useState("");
  // Add the unfilledOrders state definition here
  const [unfilledOrders, setUnfilledOrders] = useState<TransactionInfo[]>([]);
  const handleTriggerPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+(\.\d{0,2})?$/.test(value)) {
      setTriggerPrice(Number(value));
      setTriggerPriceError("");
    } else {
      setTriggerPriceError("Invalid trigger price format");
    }
  };
  const UnfilledOrders: React.FC<{
    orders: TransactionInfo[];
    triggerPrices: number[];
  }> = ({ orders, triggerPrices }) => (
    <div>
      <Typography variant="h6">Unfilled Orders:</Typography>
      {orders.map((order, index) => (
        <Typography key={index} variant="body1">
          {order.stockSymbol} - {order.quantity} shares - Trigger Price: $
          {triggerPrices[index] ? triggerPrices[index].toFixed(2) : "N/A"}
        </Typography>
      ))}
    </div>
  );

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
                  <MenuItem value="error"> </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {(orderType === "limit" || orderType === "stop") && (
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <label htmlFor="trigger-price-input">
                  <Typography
                    variant="h6"
                    sx={{ color: "#E64250" }}
                    gutterBottom
                  >
                    Trigger Price:
                  </Typography>
                </label>
              </Grid>
              <Grid item sx={{ display: "flex", alignItems: "center" }}>
                <FormControl error={triggerPriceError !== ""}>
                  <TextField
                    label="Trigger Price:"
                    id="trigger-price-input"
                    type="text"
                    size="small"
                    name="triggerPrice"
                    value={triggerPrice !== null ? triggerPrice : ""}
                    onChange={handleTriggerPriceChange}
                  />
                  {triggerPriceError && (
                    <Typography variant="body2" color="error">
                      {triggerPriceError}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          )}

          <Button onClick={handleClick} sx={{ color: "#E64250" }}>
            Go back to welcome
          </Button>
          <UnfilledOrders
            orders={unfilledOrders}
            triggerPrices={unfilledTriggerPrices}
          />
        </div>
      </Paper>
    </Box>
  );
};

export default Buy;
export enum OrderType {
  Limit = "limit",
  Market = "market",
  Stop = "stop",
}
