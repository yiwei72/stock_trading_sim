package com.company.project.utilTests;

import com.company.project.util.PriceCalculator;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.RoundingMode;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class PriceCalculatorTests {

    @Test
    public void testUpdateAvePrice() {
        Double result =
                PriceCalculator.updateAvePrice(100.0, 100L, 50.0, 50L, 1, 4, RoundingMode.HALF_UP);
        assertEquals("83.3333", result.toString());
    }

    @Test
    public void testUpdateBalance() {
        Double result1 = PriceCalculator.updateBalance(111.11, 2.22, 6L, 1);
        assertEquals("97.79", result1.toString());
        Double result2 = PriceCalculator.updateBalance(111.11, 2.22, 6L, -1);
        assertEquals("124.43", result2.toString());
    }
}
