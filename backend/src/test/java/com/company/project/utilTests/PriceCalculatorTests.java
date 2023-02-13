package com.company.project.utilTests;

import com.company.project.util.PriceCalculator;

//import aj.org.objectweb.asm.Type;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.RoundingMode;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class PriceCalculatorTests {

    @Test
    public void testUpdateAvePrice() {
        Double result0 =
                PriceCalculator.updateAvePrice(100.0, 100L, 50.0, 50L, 1, 4, RoundingMode.HALF_UP);
        assertEquals("83.3333", result0.toString());
        Double result1 = 
                PriceCalculator.updateAvePrice(100.0, 100L, 50.0, 50L, -1, 4, RoundingMode.HALF_UP);
        assertEquals("150.0", result1.toString());//has to be 150.0, not 150.0000
            }

    @Test
    public void testUpdateBalance() {
        Double result2 = PriceCalculator.updateBalance(111.11, 2.22, 6L, 1);
        assertEquals("97.79", result2.toString());
        Double result3 = PriceCalculator.updateBalance(111.11, 2.22, 6L, -1);
        assertEquals("124.43", result3.toString());
    }
}