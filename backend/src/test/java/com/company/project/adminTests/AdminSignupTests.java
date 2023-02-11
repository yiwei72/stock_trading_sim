package com.company.project.adminTests;

import com.company.project.controllers.AdminController;
import com.company.project.controllers.param.AdminSignupParam;
import com.company.project.controllers.param.UserIdentifyParam;
import com.company.project.util.Result;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class AdminSignupTests {
    @Autowired private AdminController adminController;

    @Test
    void testSuccessfulSignup() {
        String email = "test999@uwaterloo.ca";
        String password = "test999";
        String firstName = "test999";
        String lastName = "test999";
        AdminSignupParam adminSignupParam = new AdminSignupParam();
        adminSignupParam.setEmail(email);
        adminSignupParam.setPassword(password);
        adminSignupParam.setFirstName(firstName);
        adminSignupParam.setLastName(lastName);
//        System.out.println("Current email: " + email);
//        System.out.println("Current password: " + password);
//        System.out.println("Current firstName: " + firstName);
//        System.out.println("Current lastName: " + lastName);
//        System.out.print("Test result: ");
//        System.out.println(adminController.signup(adminSignupParam));
//        System.out.println();
        Result result = adminController.signup(adminSignupParam);
        assertEquals(200, result.getResultCode());

        UserIdentifyParam userIdentifyParam = new UserIdentifyParam();
        userIdentifyParam.setEmail(email);
        adminController.deleteUserByEmail(userIdentifyParam); // delete it
    }

    @Test
    void testUsedEmailSignup() {
        String email = "admin@uwaterloo.ca";
        String password = "123456";
        String firstName = "your";
        String lastName = "father";
        AdminSignupParam adminSignupParam = new AdminSignupParam();
        adminSignupParam.setEmail(email);
        adminSignupParam.setPassword(password);
        adminSignupParam.setFirstName(firstName);
        adminSignupParam.setLastName(lastName);
//        System.out.println("Current email: " + email);
//        System.out.println("Current password: " + password);
//        System.out.println("Current firstName: " + firstName);
//        System.out.println("Current lastName: " + lastName);
//        System.out.print("Test result: ");
//        System.out.println(adminController.signup(adminSignupParam));
//        System.out.println();
        Result result = adminController.signup(adminSignupParam);
        assertEquals(500, result.getResultCode());
    }
}
