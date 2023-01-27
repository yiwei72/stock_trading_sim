package com.company.project.adminTests;

import com.company.project.controllers.AdminController;
import com.company.project.controllers.param.AdminSignupParam;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class AdminDeleteUserByEmailTests {
    @Autowired
    private AdminController adminController;

    @Test
    void testSuccessfulDeleteUserByEmail() {
        // add a user to be deleted
        String email = "ToBeDeleted@uwaterloo.ca";
        String password = "delete";
        String firstName = "ff";
        String lastName = "ll";
        AdminSignupParam adminSignupParam = new AdminSignupParam();
        adminSignupParam.setEmail(email);
        adminSignupParam.setPassword(password);
        adminSignupParam.setFirstName(firstName);
        adminSignupParam.setLastName(lastName);
        System.out.println("Current email: " + email);
        System.out.println("Current password: " + password);
        System.out.println("Current firstName: " + firstName);
        System.out.println("Current lastName: " + lastName);
        System.out.println(adminController.signup(adminSignupParam));

        // delete the added user
        System.out.print("Test result: ");
        System.out.println(adminController.deleteUserByEmail(email));
        System.out.println();
    }

    @Test
    void testDeleteUserByNonexistentEmail() {
        String email = "NoSuchEmail@uwaterloo.ca";
        System.out.println("Current email: " + email);
        System.out.print("Test result: ");
        System.out.println(adminController.deleteUserByEmail(email));
        System.out.println();
    }
}
