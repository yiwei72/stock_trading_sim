package com.company.project.userTests;

import com.company.project.controllers.UserController;
import com.company.project.controllers.param.UserIdentifyParam;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ShowUserHomeTests {
    @Autowired private UserController userController;

    @Test
    void testSuccessfulShowUserHome() {
        String email = "c222wang@uwaterloo.ca";
        UserIdentifyParam userIdentifyParam = new UserIdentifyParam();
        userIdentifyParam.setEmail(email);
        System.out.println("Current email: " + email);
        System.out.print("Test result: ");
        System.out.println(userController.showUserHome(userIdentifyParam));
        System.out.println();
    }

    @Test
    void testIncorrectEmailShowUserHome() {
        String email = "nosuchuser@uwaterloo.ca";
        UserIdentifyParam userIdentifyParam = new UserIdentifyParam();
        userIdentifyParam.setEmail(email);
        System.out.println("Current email: " + email);
        System.out.print("Test result: ");
        System.out.println(userController.showUserHome(userIdentifyParam));
        System.out.println();
    }
}
