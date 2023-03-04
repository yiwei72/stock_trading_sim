import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { EmailContext, UserAuthContext } from "../Context";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import Avatar from "@mui/material/Avatar";

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

  const handleClickLog = () => {
    navigate("/log", { state: { user: user } });
  };

  const handleClickLogout = () => {
    updateEmail("");
    updateFirstName("");
    navigate("/login");
  };

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav" sx={{ bgcolor: "#E64250" }}>
          <Toolbar>
            <Box display="flex" alignItems="center" flexGrow={1}>
              <Avatar sx={{ bgcolor: "transparent" }} variant="square">
                <ShowChartIcon />
              </Avatar>
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <Button
                  sx={{ color: "#fff" }}
                  onClick={handleClickBuy}
                  disabled={isLoading}
                >
                  Buy
                </Button>
              </Box>
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <Button
                  sx={{ color: "#fff" }}
                  onClick={handleClickSell}
                  disabled={isLoading}
                >
                  Sell
                </Button>
              </Box>
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <Button
                  sx={{ color: "#fff" }}
                  onClick={handleClickLog}
                  disabled={isLoading}
                >
                  Log
                </Button>
              </Box>
            </Box>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Button sx={{ color: "#fff" }} onClick={handleClickLogout}>
                Logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Paper
                elevation={0}
                sx={{ p: 2, display: "flex", flexDirection: "column" }}
              >
                <Table>
                  <TableRow>
                    <TableCell>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "#E64250" }}
                      >
                        First Name
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{user.firstName}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "#E64250" }}
                      >
                        Last Name
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{user.lastName}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "#E64250" }}
                      >
                        Balance
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{user.balance}</Typography>
                    </TableCell>
                  </TableRow>
                </Table>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper
                elevation={4}
                sx={{ p: 2, display: "flex", flexDirection: "column" }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#E64250" }}
                >
                  &nbsp;&nbsp;Holdings
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Stock Symbol
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Average Price
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Quantity
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {user.holding.map((holding) => (
                      <TableRow key={holding.stockSymbol}>
                        <TableCell>{holding.stockSymbol}</TableCell>
                        <TableCell>{holding.price.toFixed(2)}</TableCell>
                        <TableCell>{holding.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default Welcome;
