// api key 7U6WYWYO97NRET1Y
import axios from "axios";

export async function getStockPrice(symbol: string) {
  const res = await axios.get(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=7U6WYWYO97NRET1Y`
  );
  //const {symbol: stockSymbol, open, high, low, price, volume, latestTradingDay, previousClose, change, changePercent} = res.data['Global Quote'];
  //console.log(res.data);
  return res.data["Global Quote"]["05. price"];

  //console.log(price);
}

/*the onClick property of the button element is expecting a MouseEventHandler type, but the getStockPrice function returns a Promise and not a MouseEventHandler.
To resolve this issue, you should wrap the getStockPrice function in another function that calls it and passes the event as an argument to getStockPrice.
*/
export async function fetchStockPrice(symbol: string) {
  const stockPrice = await getStockPrice(symbol).catch(console.error);
  console.log(stockPrice);
}
//tsc alphavantageapi.ts to generate .js file
//node alphavantageapi.js to test this file function, should print out the stock most recent data with high low, price, volume, etc
