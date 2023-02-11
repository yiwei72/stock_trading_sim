package com.company.project.util;

public class PriceCalculator {

    /** call it to update average price in Holding when finish buying type: buy=1, sell=-1 */
    public static Double updateAvePrice(
            Double prevAvePrice,
            Long prevQuantity,
            Double tradePrice,
            Long tradeQuantity,
            Integer type) {
        Double currTotalPrice = prevAvePrice * prevQuantity + type * tradePrice * tradeQuantity;
        Long currTotalQuantity = prevQuantity + type * tradeQuantity;
        return currTotalPrice / currTotalQuantity;
    }
}
