package com.company.project.utilTests;

import com.company.project.util.ResultGenerator;
import org.junit.jupiter.api.Test;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.junit.test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ResultGeneratorTests{
    @tests
    public void testGetSuccessResultStr{
        Result result1 = Result.genSuccessResult("Big SUCCESS");
        // Assert that result code is set to RESULT_CODE_SUCCESS
        assertEquals(Result.RESULT_CODE_SUCCESS, result1.getResultCode());
        // Assert that message is set to "SUCCESS"
        assertEquals("big SUCCESS", result1.getMessage());
    }
    @tests
    public void testGenFailResultStr() {
        Result result = Result.genFailResult("FAIL");

        // Assert that result code is set to RESULT_CODE_SERVER_ERROR
        assertEquals(Result.RESULT_CODE_SERVER_ERROR, result.getResultCode());

        // Assert that message is set to "FAIL"
        assertEquals("FAIL", result.getMessage());
    }
    @Test
    public void testGenFailResultWithObjData() {
        Object testData = new Object();
        Result result = Result.genFailResult(testData);
    
        // Assert that result code is set to RESULT_CODE_SERVER_ERROR
        assertEquals(Result.RESULT_CODE_SERVER_ERROR, result.getResultCode());
    
        // Assert that message is set to DEFAULT_FAIL_MESSAGE
        assertEquals(Result.DEFAULT_FAIL_MESSAGE, result.getMessage());
    
        // Assert that data is set to testData
        assertEquals(testData, result.getData());
}
}

