import axios from "axios";
import { fetchStockPrice } from "../components/Api";

jest.mock("axios");

describe("fetchStockPrice", () => {
  it("fetches stock price from the API", async () => {
    (axios.get as jest.Mocked<any>).mockResolvedValue({
      data: {
        "Global Quote": {
          "05. price": 150.0,
        },
      },
    });

    const stockPrice = await fetchStockPrice("AAPL");
    //testing range
    expect(stockPrice).toBeGreaterThanOrEqual(100);
    expect(stockPrice).toBeLessThanOrEqual(200);
    expect(axios.get).toHaveBeenCalledWith(
      "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=7U6WYWYO97NRET1Y"
    );
  });

  it("handles API errors", async () => {
    (axios.get as jest.Mocked<any>).mockRejectedValue(new Error("API Error"));

    try {
      await fetchStockPrice("AAPL");
    } catch (error: any) {
      expect(error.message).toBe("API Error");
    }
  });
});
