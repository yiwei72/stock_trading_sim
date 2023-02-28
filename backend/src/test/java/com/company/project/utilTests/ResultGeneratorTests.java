package com.company.project.utilTests;

import com.company.project.util.Result;
import com.company.project.util.ResultGenerator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class ResultGeneratorTests {
    @Mock private ResultGenerator resultGenerator;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        resultGenerator = new ResultGenerator();
    }

    @Test
    public void testGenSuccessResultStr() {
        String message = "Custom success message";
        Result result = ResultGenerator.genSuccessResult(message);
        assertEquals(message, result.getMessage());
    }

    @Test
    public void testGenFailResultStr() {
        String message = "Small FAIL";
        Result result = ResultGenerator.genFailResult(message);
        assertEquals(message, result.getMessage());
    }

    //    @Test
    //    public void testGenFailResultObj() {
    //        List<String> testObj = new ArrayList<>();
    //        Result result = ResultGenerator.genSuccessResult(testObj);
    //        assertEquals(testObj, result.getData());
    //    }
}
