package com.company.project.userTests;

import com.company.project.controllers.UserController;
import com.company.project.controllers.param.UserIdentifyParam;
import com.company.project.util.Result;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class ShowUserHomeTests {
    @Autowired private UserController userController;

    @Test
    void testSuccessfulShowUserHome() {
        String email = "c222wang@uwaterloo.ca";
        UserIdentifyParam userIdentifyParam = new UserIdentifyParam();
        userIdentifyParam.setEmail(email);
//        System.out.println("Current email: " + email);
//        System.out.print("Test result: ");
//        System.out.println(userController.showUserHome(userIdentifyParam));
//        System.out.println();
        Result result = userController.showUserHome(userIdentifyParam);
        assertEquals(200, result.getResultCode());
    }

    @Test
    void testIncorrectEmailShowUserHome() {
        String email = "nosuchuser@uwaterloo.ca";
        UserIdentifyParam userIdentifyParam = new UserIdentifyParam();
        userIdentifyParam.setEmail(email);
//        System.out.println("Current email: " + email);
//        System.out.print("Test result: ");
//        System.out.println(userController.showUserHome(userIdentifyParam));
//        System.out.println();
        Result result = userController.showUserHome(userIdentifyParam);
        assertEquals(500, result.getResultCode());
    }
}
