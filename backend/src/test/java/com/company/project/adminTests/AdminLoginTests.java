package com.company.project.adminTests;

import com.company.project.controllers.AdminController;
import com.company.project.controllers.param.AdminLoginParam;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class AdminLoginTests {

    @Autowired
    private AdminController adminController;

    @Test
    void testSuccessfulLogin() {
        String email = "admin@uwaterloo.ca";
        String password = "123456";
        AdminLoginParam adminLoginParam = new AdminLoginParam();
        adminLoginParam.setEmail(email);
        adminLoginParam.setPassword(password);
        System.out.println("Current email: " + email);
        System.out.println("Current password: " + password);
        System.out.print("Test result: ");
        System.out.println(adminController.login(adminLoginParam));
        System.out.println();
    }

    @Test
    void testIncorrectEmailAndPasswordLogin() {
        String email = "cuiyangwang@uwaterloo.ca";
        String password = "654321";
        AdminLoginParam adminLoginParam = new AdminLoginParam();
        adminLoginParam.setEmail(email);
        adminLoginParam.setPassword(password);
        System.out.println("Current email: " + email);
        System.out.println("Current password: " + password);
        System.out.print("Test result: ");
        System.out.println(adminController.login(adminLoginParam));
        System.out.println();
    }

    @Test
    void testIncorrectEmailLogin() {
        String email = "cuiyangwang@uwaterloo.ca";
        String password = "123456";
        AdminLoginParam adminLoginParam = new AdminLoginParam();
        adminLoginParam.setEmail(email);
        adminLoginParam.setPassword(password);
        System.out.println("Current email: " + email);
        System.out.println("Current password: " + password);
        System.out.print("Test result: ");
        System.out.println(adminController.login(adminLoginParam));
        System.out.println();
    }

    @Test
    void testIncorrectPasswordLogin() {
        String email = "admin@uwaterloo.ca";
        String password = "654321";
        AdminLoginParam adminLoginParam = new AdminLoginParam();
        adminLoginParam.setEmail(email);
        adminLoginParam.setPassword(password);
        System.out.println("Current email: " + email);
        System.out.println("Current password: " + password);
        System.out.print("Test result: ");
        System.out.println(adminController.login(adminLoginParam));
        System.out.println();
    }

    @Test
    void testEmptyLogin() {
        String email = "";
        String password = "";
        AdminLoginParam adminLoginParam = new AdminLoginParam();
        adminLoginParam.setEmail(email);
        adminLoginParam.setPassword(password);
        System.out.println("Current email: " + email);
        System.out.println("Current password: " + password);
        System.out.print("Test result: ");
        System.out.println(adminController.login(adminLoginParam));
        System.out.println();
    }
}
