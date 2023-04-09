package com.company.project.adminTests;

import com.company.project.controllers.AdminController;
import com.company.project.controllers.param.AdminLoginParam;
import com.company.project.util.Result;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class AdminLoginTests {

    @Autowired private AdminController adminController;

    @Test
    void testSuccessfulLogin() {
        String email = "admin@uwaterloo.ca";
        String password = "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92";
        AdminLoginParam adminLoginParam = new AdminLoginParam();
        adminLoginParam.setEmail(email);
        adminLoginParam.setPassword(password);
        //        System.out.println("Current email: " + email);
        //        System.out.println("Current password: " + password);
        //        System.out.print("Test result: ");
        //        System.out.println(adminController.login(adminLoginParam));
        //        System.out.println();
        Result result = adminController.login(adminLoginParam);
        assertEquals(200, result.getResultCode());
    }

    @Test
    void testIncorrectEmailAndPasswordLogin() {
        String email = "cuiyangwang@uwaterloo.ca";
        String password = "654321";
        AdminLoginParam adminLoginParam = new AdminLoginParam();
        adminLoginParam.setEmail(email);
        adminLoginParam.setPassword(password);
        //        System.out.println("Current email: " + email);
        //        System.out.println("Current password: " + password);
        //        System.out.print("Test result: ");
        //        System.out.println(adminController.login(adminLoginParam));
        //        System.out.println();
        Result result = adminController.login(adminLoginParam);
        assertEquals(500, result.getResultCode());
    }

    @Test
    void testIncorrectEmailLogin() {
        String email = "cuiyangwang@uwaterloo.ca";
        String password = "123456";
        AdminLoginParam adminLoginParam = new AdminLoginParam();
        adminLoginParam.setEmail(email);
        adminLoginParam.setPassword(password);
        //        System.out.println("Current email: " + email);
        //        System.out.println("Current password: " + password);
        //        System.out.print("Test result: ");
        //        System.out.println(adminController.login(adminLoginParam));
        //        System.out.println();
        Result result = adminController.login(adminLoginParam);
        assertEquals(500, result.getResultCode());
    }

    @Test
    void testIncorrectPasswordLogin() {
        String email = "admin@uwaterloo.ca";
        String password = "654321";
        AdminLoginParam adminLoginParam = new AdminLoginParam();
        adminLoginParam.setEmail(email);
        adminLoginParam.setPassword(password);
        //        System.out.println("Current email: " + email);
        //        System.out.println("Current password: " + password);
        //        System.out.print("Test result: ");
        //        System.out.println(adminController.login(adminLoginParam));
        //        System.out.println();
        Result result = adminController.login(adminLoginParam);
        assertEquals(500, result.getResultCode());
    }

    @Test
    void testEmptyLogin() {
        String email = "";
        String password = "";
        AdminLoginParam adminLoginParam = new AdminLoginParam();
        adminLoginParam.setEmail(email);
        adminLoginParam.setPassword(password);
        //        System.out.println("Current email: " + email);
        //        System.out.println("Current password: " + password);
        //        System.out.print("Test result: ");
        //        System.out.println(adminController.login(adminLoginParam));
        //        System.out.println();
        Result result = adminController.login(adminLoginParam);
        assertEquals(500, result.getResultCode());
    }
}
