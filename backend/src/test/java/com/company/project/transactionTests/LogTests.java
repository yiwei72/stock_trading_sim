package com.company.project.transactionTests;

import com.company.project.controllers.TransactionController;
import com.company.project.controllers.param.UserIdentifyParam;
import com.company.project.util.Result;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class LogTests {
    @Autowired private TransactionController transactionController;

    @Test
    void testNoSuchUserLog() {
        String email = "nosuchuser@uwaterloo.ca";
        UserIdentifyParam userIdentifyParam = new UserIdentifyParam();
        userIdentifyParam.setEmail(email);
        Result result = transactionController.log(userIdentifyParam);
        System.out.println(result);
        assertEquals(500, result.getResultCode());
    }

    @Test
    void testNoTransactionUserLog() {
        String email = "test2@uwaterloo.ca";
        UserIdentifyParam userIdentifyParam = new UserIdentifyParam();
        userIdentifyParam.setEmail(email);
        Result result = transactionController.log(userIdentifyParam);
        System.out.println(result);
        assertEquals(200, result.getResultCode());
    }

    @Test
    void testLog() {
        String email = "admin@uwaterloo.ca";
        UserIdentifyParam userIdentifyParam = new UserIdentifyParam();
        userIdentifyParam.setEmail(email);
        Result result = transactionController.log(userIdentifyParam);
        System.out.println(result);
        assertEquals(200, result.getResultCode());
    }
}
