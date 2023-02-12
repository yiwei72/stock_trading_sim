package com.company.project.util;

import java.math.RoundingMode;

public class PriceCalculator {

    /** call it to update average price in Holding when finish buying type: buy=1, sell=-1 */
    public static Double updateAvePrice(
            Double prevAvePrice,
            Long prevQuantity,
            Double tradePrice,
            Long tradeQuantity,
            Integer type,
            int scale,
            RoundingMode roundingMode) {
//        Double currTotalPrice = prevAvePrice * prevQuantity + type * tradePrice * tradeQuantity;
//        Long currTotalQuantity = prevQuantity + type * tradeQuantity;
//        return currTotalPrice / currTotalQuantity;

        Double prevTotalPrice = DoubleCalculator.mul(prevAvePrice, prevQuantity);
        Double tradeTotalPrice = DoubleCalculator.mul(tradePrice, tradeQuantity);
        Double currTotalPrice = 0.0;
        if (type > 0) {
            currTotalPrice = DoubleCalculator.add(prevTotalPrice, tradeTotalPrice);
        }
        else {
            currTotalPrice = DoubleCalculator.sub(prevTotalPrice, tradeTotalPrice);
        }
        Long currTotalQuantity = prevQuantity + type * tradeQuantity;
        return DoubleCalculator.div(currTotalPrice, currTotalQuantity, scale, roundingMode);
    }
}
