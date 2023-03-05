import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EmailContext } from "../Context";
import ReactPaginate from "react-paginate";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TablePagination from '@mui/material/TablePagination';

interface Infos {
  serialNumber: number;
  type: number;
  email: String;
  stockSymbol: string;
  timeStamp: number;
  price: number;
  quantity: number;
}

interface Info {
  type: string;
  stockSymbol: string;
  timestamp: string;
  price: number;
  quantity: number;
}

const Log: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/welcome");
  };

  const transformResponse = (responseData: Infos[]) => {
    return responseData.map((log) => {
      console.log(log);
      let type: string = log.type === 1 ? "buy" : "sell";
      const date = new Date(log.timeStamp);
      // console.log(log.timestamp)
      const dataString = date.toLocaleString();
      // console.log(dataString)

      return {
        type: type,
        stockSymbol: log.stockSymbol,
        timestamp: dataString,
        price: log.price,
        quantity: log.quantity,
      };
    });
  };
  const [logErrorMessage, setLogErrorMessage] = useState("");
  const { email } = useContext(EmailContext);
  const [logs, setLogs] = useState<Info[]>([]);
  const [hasLog, setHasLogs] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const PAGE_SIZE: number = 10;
  // const handlePageChange = ({ selected }: { selected: number }) => {
  //   setCurrentPage(selected);
  // };
  const handlePageChange = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const fetchlog = async () => {
      try {
        const response = await axios.post("/api/transaction/log", {
          email: email,
        });
        console.log(response);
        if (
          response.data.resultCode === 500 ||
          response.data.data.length === 0
        ) {
          throw new Error("No trading log");
        }
        const data = transformResponse(response.data.data);
        setLogs(data);
      } catch (error: any) {
        setLogErrorMessage("No trading log");
        setHasLogs(false);
      }
    };

    fetchlog();
  }, [email]);
  return (
        <div>
<<<<<<< Updated upstream
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Stock Symbol</th>
                <th>Timestamp</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {logs
                .slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE)
                .map((log) => (
                  <tr key={log.timestamp}>
                    <td>{log.type}</td>
                    <td>{log.stockSymbol}</td>
                    <td>{log.timestamp}</td>
                    <td>{log.price}</td>
                    <td>{log.quantity}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <ReactPaginate
            pageCount={Math.ceil(logs.length / PAGE_SIZE)}
            onPageChange={handlePageChange}
            forcePage={currentPage}
          />
=======
          {!hasLog && <h1 style={{ color: "red" }}>{logErrorMessage}</h1>}

          {hasLog && (
            <div>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell>Stock Symbol</TableCell>
                    <TableCell>Timestamp</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {logs
                    .slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE)
                    .map((log) => (
                      <TableRow key={log.timestamp}>
                        <TableCell>{log.type}</TableCell>
                        <TableCell>{log.stockSymbol}</TableCell>
                        <TableCell>{log.timestamp}</TableCell>
                        <TableCell>{log.price}</TableCell>
                        <TableCell>{log.quantity}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={logs.length}
                rowsPerPage={PAGE_SIZE}
                page={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          )}
          <button onClick={handleClick}>Go back to welcome</button>
>>>>>>> Stashed changes
        </div>
  );
};

export default Log;
