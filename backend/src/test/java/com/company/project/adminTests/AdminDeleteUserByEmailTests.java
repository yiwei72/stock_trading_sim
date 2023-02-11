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
public class AdminDeleteUserByEmailTests {
    @Autowired private AdminController adminController;

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
        adminController.signup(adminSignupParam);

        // delete the added user
        UserIdentifyParam userIdentifyParam = new UserIdentifyParam();
        userIdentifyParam.setEmail(email);
        Result result = adminController.deleteUserByEmail(userIdentifyParam);
        assertEquals(200, result.getResultCode());
    }

    @Test
    void testDeleteUserByNonexistentEmail() {
        String email = "NoSuchEmail@uwaterloo.ca";
        System.out.println("Current email: " + email);

        // delete non-existent user
        UserIdentifyParam userIdentifyParam = new UserIdentifyParam();
        userIdentifyParam.setEmail(email);
        Result result = adminController.deleteUserByEmail(userIdentifyParam);
        assertEquals(500, result.getResultCode());
    }
}
