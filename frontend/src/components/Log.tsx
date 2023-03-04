import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EmailContext } from "../Context";
import ReactPaginate from "react-paginate";

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
  const PAGE_SIZE: number = 20;
  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
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
      {!hasLog && <h1 style={{ color: "red" }}>{logErrorMessage}</h1>}

      {hasLog && (
        <div>
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
        </div>
      )}
      <button onClick={handleClick}>Go back to welcome</button>
    </div>
  );
};

export default Log;
