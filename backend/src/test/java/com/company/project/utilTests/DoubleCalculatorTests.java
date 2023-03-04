package com.company.project.utilTests;

import com.company.project.util.DoubleCalculator;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import java.math.RoundingMode;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

@SpringBootTest
public class DoubleCalculatorTests {
    @Mock private DoubleCalculator doubleCalculator;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        doubleCalculator = new DoubleCalculator();
    }

    @Test
    public void testAdd() {
        Double num1 = 1.0;
        Double num2 = 2.0;
        Double result = DoubleCalculator.add(num1, num2);
        //        System.out.println(result);
        assertEquals(3.0, result, 0.001);
    }

    @Test
    public void testSub() {
        Double num1 = 333.33;
        Double num2 = 222.22;
        Double result = DoubleCalculator.sub(num1, num2);
        //        System.out.println(result);
        assertEquals(111.11, result, 0.0001);
    }

    @Test
    public void testMul() {
        Double num1 = 111.11;
        Double num2 = 222.22;
        Double result1 = DoubleCalculator.mul(num1, num2);
        //        System.out.println(result1);
        assertEquals(24690.8642, result1, 0.0001);

        Double num3 = 333.333;
        Long num4 = 100L;
        Double result2 = DoubleCalculator.mul(num3, num4);
        //        System.out.println(result2);
        assertEquals(33333.3, result2, 0.0001);
    }

    @Test
    public void testDiv() {
        Double num1 = 654.321;
        Double num2 = 123.789;
        Double result1 = DoubleCalculator.div(num1, num2, 4, RoundingMode.HALF_UP);
        //        System.out.println(result1);
        assertEquals(5.2858, result1, 0.00001);

        Double num3 = 654.789;
        Double num4 = 123.987;
        Double result2 = DoubleCalculator.div(num3, num4, 4, RoundingMode.HALF_UP);
        //        System.out.println(result2);
        assertEquals(5.2811, result2, 0.0001);

        Double num5 = 123456.78;
        Long num6 = 100L;
        Double result3 = DoubleCalculator.div(num5, num6, 4, RoundingMode.HALF_UP);
        //        System.out.println(result3);
        assertEquals(1234.5678, result3, 0.0001);
    }
}
