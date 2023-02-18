package com.company.project.utilTests;
import com.company.project.util.ResultGenerator;
import com.company.project.util.Result;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import org.springframework.boot.test.context.SpringBootTest;
//import org.junit.test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
public class ResultGeneratorTests{
    @Mock private ResultGenerator resultGenerator1;
    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        resultGenerator1 = new ResultGenerator();
    }
    /* 
    @Test
    @DisplayName("Test generating a success result with custom message")
    public void testGenSuccessResultStr(){

        Result<String> result = ResultGenerator.genSuccessResult("Custom success message");
    
        //assertEquals(200, result.getResultCode());
        assertEquals("Custom success message", result.getMessage());
        assertNull(result.getData());    }
    
    @Test
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
    */
}

