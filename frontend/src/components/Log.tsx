import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EmailContext } from "../Context";
 
interface Infos{
  serialNumber:number;
  type: number;
  email: String;
  stockSymbol: string;
  timestamp:number;
  price: number;
  quantity: number;
}

 
interface Info{
  type: string;
  stockSymbol: string;
  timestamp:string;
  price: number;
  quantity: number;
}

const Log: React.FC = () =>{
    const navigate = useNavigate();
    
    const handleClick = () => {
      navigate("/welcome");
    };

    const transformResponse = (responseData:Infos[]) => {
      return responseData.map((log) => {
        let type:string = log.type==1?"buy":"sell";
        const date = new Date(log.timestamp);
        const dataString = date.toDateString();
      
        return {
          type: type,
          stockSymbol: log.stockSymbol,
          timestamp:dataString,
          price: log.price,
          quantity: log.quantity
        }
      })
    }
    const[logErrorMessage,setLogErrorMessage] = useState("");
    const{email} = useContext(EmailContext);
    const[logs,setLogs] = useState<Info[]>([]);
    const[hasLog,setHasLogs] = useState(true);
    
    useEffect(() => {
      const fetchlog = async() => {
        try{
          const response = await axios.post("/api/transaction/log",{email});
          if(response.data.resultCode==500){
            throw new Error("No trading log")
          }
          const data = transformResponse(response.data.data);
          setLogs(data);
        }catch(error:any){
          setLogErrorMessage(error.message);
          setHasLogs(false);
        } 
      }
      
      fetchlog();
    },[]);
    return(
      <div>
        {!hasLog && <h1 style={{ color: "red" }}>{logErrorMessage}</h1> }
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Stock Symbol</th>
              <th>Timestamp</th>
              <th>Price</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.timestamp}>
              <td>{log.type}</td>
              <td>{log.stockSymbol}</td>
              <td>{log.timestamp}</td>
              <td>{log.price}</td>
              <td>{log.quantity}</td>
            </tr>

            )
            )}
          </tbody>
        </table>
        <button onClick={handleClick}>Go back to welcome</button>
      </div>
    );


};

export default Log;