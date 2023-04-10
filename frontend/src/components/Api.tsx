import axios from "axios";

export async function getStockPrice(symbol: string) {
  const res = await axios.get(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=7U6WYWYO97NRET1Y`
  );
  const {
    '01. symbol': stockSymbol,
    '02. open': open,
    '03. high': high,
    '04. low': low,
    '05. price': price,
    '06. volume': volume,
    '07. latest trading day': latestTradingDay,
    '08. previous close': previousClose,
    '09. change': change,
    '10. change percent': changePercent
  } = res.data['Global Quote'];
  
  return {
    stockSymbol,
    open,
    high,
    low,
    price,
    volume,
    latestTradingDay,
    previousClose,
    change,
    changePercent
  };
}

export async function fetchStockPrice(symbol: string) {
  const stockInfo = await getStockPrice(symbol).catch(console.error);
  console.log(stockInfo);
  return stockInfo;
}
