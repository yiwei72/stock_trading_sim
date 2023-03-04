package com.company.project.utilTests;

import com.company.project.util.Result;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class ResultTests {
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

    @Test
    public void testToString() {
        int expectedCode = 200;
        String expectedMessage = "SUCCESS";
        // String data ; // null
        Result<String> result1 = new Result<>(expectedCode, expectedMessage);
        result1.setData("");
        String expectedString = "Result{resultCode=200, message='SUCCESS', data=}";
        assertEquals(expectedString, result1.toString());
    }
}
