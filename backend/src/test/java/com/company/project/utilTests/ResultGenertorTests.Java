package com.company.project.utilTests;

import com.company.project.util.ResultGenerator;
import org.junit.jupiter.api.Test;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.junit.test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ResultGeneratorTests{
    @tests
    public void testGenSuccessResultStr{
        String message = "custom"
        Result result1 = new Result
        result1.genSuccessResult(message);

        assertEquals(Result.RESULT_CODE_SUCCESS, result1.getResultCode());
  
        assertEquals(message, result1.getMessage());
    }
    @tests
    public void testGenFailResultStr() {
        String message = "Small FAIL"
        Result result = Result.genFailResult(message);

 
        assertEquals(Result.RESULT_CODE_SERVER_ERROR, result.getResultCode());

        assertEquals(message, result.getMessage());
    }
    @Test
    public void testGenFailResultWithObjData() {
        Object testData = new Object();
        Result result = Result.genFailResult(testData);

        assertEquals(Result.RESULT_CODE_SERVER_ERROR, result.getResultCode());

        assertEquals(Result.DEFAULT_FAIL_MESSAGE, result.getMessage());
    

        assertEquals(testData, result.getData());
}
}

