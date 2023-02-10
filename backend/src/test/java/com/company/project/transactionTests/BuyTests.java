package com.company.project.transactionTests;

import com.company.project.controllers.TransactionController;
import com.company.project.controllers.param.TransactionInfoParam;
import com.company.project.util.Result;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class BuyTests {
    @Autowired
    private TransactionController transactionController;

    @Test
    void testBuyStockWithoutEnoughBalance() {
        Integer type = 1;
        String email = "admin@uwaterloo.ca";
        String stockSymbol = "TSLA";
        Double price = 9999999999999999.0;
        Long quantity = 1L;
        TransactionInfoParam transactionInfoParam = new TransactionInfoParam();
        transactionInfoParam.setType(type);
        transactionInfoParam.setEmail(email);
        transactionInfoParam.setStockSymbol(stockSymbol);
        transactionInfoParam.setPrice(price);
        transactionInfoParam.setQuantity(quantity);
        Result result = transactionController.buy(transactionInfoParam);
        System.out.println(result);
        assertEquals(500, result.getResultCode());
    }

    @Test
    void testSuccessfulBuyExistingStock() {
        Integer type = 1;
        String email = "admin@uwaterloo.ca";
        String stockSymbol = "AMZN";
        Double price = 200.0;
        Long quantity = 100L;
        TransactionInfoParam transactionInfoParam = new TransactionInfoParam();
        transactionInfoParam.setType(type);
        transactionInfoParam.setEmail(email);
        transactionInfoParam.setStockSymbol(stockSymbol);
        transactionInfoParam.setPrice(price);
        transactionInfoParam.setQuantity(quantity);
        Result result = transactionController.buy(transactionInfoParam);
        System.out.println(result);
        assertEquals(200, result.getResultCode());
    }

    @Test
    void testSuccessfulBuyNewStock() {
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
        Result result = transactionController.buy(transactionInfoParam);
        System.out.println(result);
        assertEquals(200, result.getResultCode());
    }
}
