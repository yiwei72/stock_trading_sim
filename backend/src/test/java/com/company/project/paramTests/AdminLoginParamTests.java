package com.company.project.paramTests;

// package com.company.project.controllers.param.AdminLoginParam;
import com.company.project.controllers.param.AdminLoginParam;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertFalse;
import org.junit.jupiter.api.BeforeEach;

import org.junit.jupiter.api.Test;
// for testing case
import javax.validation.ConstraintViolation;
import java.util.Set;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

public class AdminLoginParamTests {
    private Validator validator;

    @BeforeEach
    void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    void testAdminLoginParamValidInput() {
        // Setup
        AdminLoginParam adminLoginParam = new AdminLoginParam();
        adminLoginParam.setEmail("admin@uwaterloo.ca");
        adminLoginParam.setPassword("123456");
        // Verify
        Set<ConstraintViolation<AdminLoginParam>> violations = validator.validate(adminLoginParam);
        assertTrue(violations.isEmpty());
    }

    @Test
    void testAdminLoginParamEquals() {
        AdminLoginParam param1 = new AdminLoginParam();
        param1.setEmail("test@example.com");
        param1.setPassword("password");
        AdminLoginParam param2 = new AdminLoginParam();
        param2.setEmail("test@example.com");
        param2.setPassword("password");
        AdminLoginParam param3 = new AdminLoginParam();
        param3.setEmail("other@example.com");
        param3.setPassword("password");
        assertEquals(param1, param2);
        assertNotEquals(param1, param3);
    }

    @Test
    void testAdminLoginParamHashCode() {
        AdminLoginParam param1 = new AdminLoginParam();
        param1.setEmail("test@example.com");
        param1.setPassword("password");
        AdminLoginParam param2 = new AdminLoginParam();
        param2.setEmail("test@example.com");
        param2.setPassword("password");
        AdminLoginParam param3 = new AdminLoginParam();
        param3.setEmail("other@example.com");
        param3.setPassword("password");
        assertEquals(param1.hashCode(), param2.hashCode());
        assertNotEquals(param1.hashCode(), param3.hashCode());
        assertNotEquals(param2.hashCode(), param3.hashCode());
    }

    @Test
    void testAdminLoginParamToString() {
        AdminLoginParam param = new AdminLoginParam();
        param.setEmail("test@example.com");
        param.setPassword("password");
        String expected = "AdminLoginParam(email=test@example.com, password=password)";
        assertEquals(expected, param.toString());
        assertNotEquals("haha", param.toString());
    }

    @Test
    public void testEquals() {
        // Scenario 1: both instances have the same email and password values
        // Arrange
        AdminLoginParam param1 = new AdminLoginParam();
        param1.setEmail("test@example.com");
        param1.setPassword("password");
        AdminLoginParam param2 = new AdminLoginParam();
        param2.setEmail("test@example.com");
        param2.setPassword("password");
        // Act
        boolean result = param1.equals(param2);

        // Assert
        assertTrue(result);

        // Scenario 3: both instances have different password values
        // Arrange
        param1.setEmail("test@example.com");
        param1.setPassword("password1");
        param2.setEmail("test@example.com");
        param2.setPassword("password2");
        // Act
        result = param1.equals(param2);

        // Assert
        assertFalse(result);
        // Scenario 4: both instances have different email but same password values
        // Arrange
        param1.setEmail("test1@example.com");
        param1.setPassword("same");
        param2.setEmail("test2@example.com");
        param2.setPassword("same");
        // Act
        result = param1.equals(param2);
        // Assert
        assertFalse(result);
        // Scenario 5: comparing an instance to itself and comparing to null
        // Arrange
        param1.setEmail("test@example.com");
        param1.setPassword("password");
        // Act
        result = param1.equals(param1);
        boolean nullResult = param1.equals(null);
        // Assert
        assertTrue(result);
        assertFalse(nullResult);
        // Scenario 6: comparing 2 null
        param1.setEmail("");
        param1.setPassword("");
        param2.setEmail("");
        param2.setPassword("");
        // Act
        result = param1.equals(param2);
        assertTrue(result);
    }
}
