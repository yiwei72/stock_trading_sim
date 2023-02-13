package com.company.project.util;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class DoubleCalculator {

    public static Double add(Double num1, Double num2) {
        BigDecimal bigNum1 = new BigDecimal(num1.toString());
        BigDecimal bigNum2 = new BigDecimal(num2.toString());
        return bigNum1.add(bigNum2).doubleValue();
    }

    public static Double sub(Double num1, Double num2) {
        BigDecimal bigNum1 = new BigDecimal(num1.toString());
        BigDecimal bigNum2 = new BigDecimal(num2.toString());
        return bigNum1.subtract(bigNum2).doubleValue();
    }

    public static Double mul(Double num1, Double num2) {
        BigDecimal bigNum1 = new BigDecimal(num1.toString());
        BigDecimal bigNum2 = new BigDecimal(num2.toString());
        return bigNum1.multiply(bigNum2).doubleValue();
    }

    public static Double mul(Double num1, Long num2) {
        BigDecimal bigNum1 = new BigDecimal(num1.toString());
        BigDecimal bigNum2 = new BigDecimal(num2.toString());
        return bigNum1.multiply(bigNum2).doubleValue();
    }

    public static Double div(Double num1, Double num2, int scale, RoundingMode roundingMode) {
        BigDecimal bigNum1 = new BigDecimal(num1.toString());
        BigDecimal bigNum2 = new BigDecimal(num2.toString());
        return bigNum1.divide(bigNum2, scale, roundingMode).doubleValue();
    }

    public static Double div(Double num1, Long num2, int scale, RoundingMode roundingMode) {
        BigDecimal bigNum1 = new BigDecimal(num1.toString());
        BigDecimal bigNum2 = new BigDecimal(num2.toString());
        return bigNum1.divide(bigNum2, scale, roundingMode).doubleValue();
    }
}
