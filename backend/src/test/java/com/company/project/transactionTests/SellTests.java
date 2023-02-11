package com.company.project.transactionTests;

import com.company.project.controllers.TransactionController;
import com.company.project.controllers.param.TransactionInfoParam;
import com.company.project.util.Result;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class SellTests {
    @Autowired
    private TransactionController transactionController;

    @Test
    void testSellWithoutHolding() {
        Integer type = -1;
        String email = "admin@uwaterloo.ca";
        String stockSymbol = "TSLAA";
        Double price = 100.0;
        Long quantity = 100L;
        TransactionInfoParam transactionInfoParam = new TransactionInfoParam();
        transactionInfoParam.setType(type);
        transactionInfoParam.setEmail(email);
        transactionInfoParam.setStockSymbol(stockSymbol);
        transactionInfoParam.setPrice(price);
        transactionInfoParam.setQuantity(quantity);
        Result result = transactionController.sell(transactionInfoParam);
        System.out.println(result);
        assertEquals(500, result.getResultCode());
    }

    @Test
    void testSellWithoutEnoughQuantity() {
        Integer type = 1;
        String email = "admin@uwaterloo.ca";
        String stockSymbol = "TSLA";
        Double price = 100.0;
        Long quantity = 100L;
        TransactionInfoParam transactionInfoParam = new TransactionInfoParam();
        transactionInfoParam.setType(type);
        transactionInfoParam.setEmail(email);
        transactionInfoParam.setStockSymbol(stockSymbol);
        transactionInfoParam.setPrice(price);
        transactionInfoParam.setQuantity(quantity);
        transactionController.buy(transactionInfoParam); // buy 100 TSLA to sell

        transactionInfoParam.setType(-1);
        transactionInfoParam.setQuantity(999999999L);
        Result result = transactionController.sell(transactionInfoParam);
        System.out.println(result);
        assertEquals(500, result.getResultCode());
    }

    @Test
    void testSuccessfulSellPartHoldingStock() {
        Integer type = -1;
        String email = "admin@uwaterloo.ca";
        String stockSymbol = "TSLA";
        Double price = 100.0;
        Long quantity = 80L;
        TransactionInfoParam transactionInfoParam = new TransactionInfoParam();
        transactionInfoParam.setType(type);
        transactionInfoParam.setEmail(email);
        transactionInfoParam.setStockSymbol(stockSymbol);
        transactionInfoParam.setPrice(price);
        transactionInfoParam.setQuantity(quantity);
        Result result = transactionController.sell(transactionInfoParam);
        System.out.println(result);
        assertEquals(200, result.getResultCode());
    }

    @Test
    void testSuccessfulSellAllHoldingStock() {
        Integer type = -1;
        String email = "admin@uwaterloo.ca";
        String stockSymbol = "TSLA";
        Double price = 100.0;
        Long quantity = 20L;
        TransactionInfoParam transactionInfoParam = new TransactionInfoParam();
        transactionInfoParam.setType(type);
        transactionInfoParam.setEmail(email);
        transactionInfoParam.setStockSymbol(stockSymbol);
        transactionInfoParam.setPrice(price);
        transactionInfoParam.setQuantity(quantity);
        Result result = transactionController.sell(transactionInfoParam);
        System.out.println(result);
        assertEquals(200, result.getResultCode());
    }
}
