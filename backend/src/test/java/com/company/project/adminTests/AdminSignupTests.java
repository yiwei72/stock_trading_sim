package com.company.project.adminTests;

import com.company.project.controllers.AdminController;
import com.company.project.controllers.param.AdminSignupParam;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class AdminSignupTests {
    @Autowired
    private AdminController adminController;

    @Test
    void testSuccessfulSignup() {
        String email = "c222wang@uwaterloo.ca";
        String password = "qwerty";
        String firstName = "Cuiyang";
        String lastName = "Wang";
        AdminSignupParam adminSignupParam = new AdminSignupParam();
        adminSignupParam.setEmail(email);
        adminSignupParam.setPassword(password);
        adminSignupParam.setFirstName(firstName);
        adminSignupParam.setLastName(lastName);
        System.out.println("Current email: " + email);
        System.out.println("Current password: " + password);
        System.out.println("Current firstName: " + firstName);
        System.out.println("Current lastName: " + lastName);
        System.out.print("Test result: ");
        System.out.println(adminController.signup(adminSignupParam));
        System.out.println();
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
        System.out.println("Current email: " + email);
        System.out.println("Current password: " + password);
        System.out.println("Current firstName: " + firstName);
        System.out.println("Current lastName: " + lastName);
        System.out.print("Test result: ");
        System.out.println(adminController.signup(adminSignupParam));
        System.out.println();
    }
}
