package com.company.project.utilTests;

import com.company.project.util.Result;
import org.junit.jupiter.api.Test;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.junit.test;

import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.junit.jupiter.api.Assertions.assertFalse;

public class ResultTest {
    @Test
    public void testResultConstructorWithIntAndString() {
        int expectedCode = 200;
        String expectedMessage = "SUCCESS";
        Result<String> result = new Result<>(expectedCode, expectedMessage);

        int actualCode = result.getResultCode();
        String actualMessage = result.getMessage();

        assertEquals(expectedCode, actualCode);
        assertEquals(expectedMessage, actualMessage);
    }

    @Test
    public void testGetData() {
        Result<String> result = new Result<>(200, "SUCCESS");
        result.setData("test data");

        String data = result.getData();
        assertEquals("test data", data);
    }




    

}
