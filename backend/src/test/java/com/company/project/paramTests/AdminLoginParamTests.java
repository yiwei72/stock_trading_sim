package com.company.project.paramTests;

//package com.company.project.controllers.param.AdminLoginParam;
import com.company.project.controllers.param.AdminLoginParam;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import java.math.RoundingMode;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertFalse;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;
//for testing case
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
    public void testAdminLoginParam() {
        // Setup
        String email = "test@example.com";
        String password = "password123";
        AdminLoginParam adminLoginParam = new AdminLoginParam();
        adminLoginParam.setEmail(email);
        adminLoginParam.setPassword(password);
        // Verify
        assertEquals(email, adminLoginParam.getEmail());
        assertEquals(password, adminLoginParam.getPassword());
    }
    @Test
    void testAdminLoginParamValidInput() {
        // Setup
        AdminLoginParam adminLoginParam = new AdminLoginParam();
        adminLoginParam.setEmail("test@example.com");
        adminLoginParam.setPassword("password");
        // Verify
        Set<ConstraintViolation<AdminLoginParam>> violations = validator.validate(adminLoginParam);
        assertTrue(violations.isEmpty());
    }
    @Test
    void testAdminLoginParamEmptyFields() {
        AdminLoginParam param = new AdminLoginParam();
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<AdminLoginParam>> violations = validator.validate(param);

        assertEquals(2, violations.size());
        for (ConstraintViolation<AdminLoginParam> violation : violations) {
            String message = violation.getMessage();
            assertTrue(message.contains("can't be empty"));
        }
    }
    @Test
    void testAdminLoginParamValidFields() {
        AdminLoginParam param = new AdminLoginParam();
        param.setEmail("test@example.com");
        param.setPassword("password");
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<AdminLoginParam>> violations = validator.validate(param);

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
    }
    @Test
    void testAdminLoginParamToString() {
        AdminLoginParam param = new AdminLoginParam();
        param.setEmail("test@example.com");
        param.setPassword("password");

        String expected = "AdminLoginParam(email=test@example.com, password=password)";
        assertEquals(expected, param.toString());
    }
//for @Data  hashcode() and equals(objects)
@Test
public void testData() {
    AdminLoginParam param1 = new AdminLoginParam();
    param1.setEmail("test@example.com");
    param1.setPassword("password1");

    AdminLoginParam param2 = new AdminLoginParam();
    param2.setEmail("test@example.com");
    param2.setPassword("password1");

    AdminLoginParam param3 = new AdminLoginParam();
    param3.setEmail("test2@example.com");
    param3.setPassword("password2");

    // test equals()
    assertTrue(param1.equals(param2));
    assertFalse(param1.equals(param3));

    // test hashCode()
    assertEquals(param1.hashCode(), param2.hashCode());
    assertNotEquals(param1.hashCode(), param3.hashCode());

    // test toString()
    assertEquals("AdminLoginParam(email=test@example.com, password=password1)", param1.toString());
}





}

