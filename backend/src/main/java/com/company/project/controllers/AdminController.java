package com.company.project.controllers;
import com.company.project.controllers.param.AdminLoginParam;
import com.company.project.controllers.param.AdminSignupParam;
import com.company.project.controllers.param.UserIdentifyParam;
import com.company.project.service.AdminService;
import com.company.project.util.Result;
import com.company.project.util.ResultGenerator;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@Api
@RequestMapping("/admin")
public class AdminController {

    @Resource private AdminService adminService;

    @PostMapping("/login")
    public Result<String> login(@RequestBody AdminLoginParam adminLoginParam) {
        if (adminService.login(adminLoginParam.getEmail(), adminLoginParam.getPassword())) {
            Result result = ResultGenerator.genSuccessResult();
            result.setData("Login success.");
            return result;
        } else {
            Result result = ResultGenerator.genFailResult();
            result.setData("Email or password is incorrect.");
            return result;
        }
    }

    @PostMapping("/signup")
    public Result<String> signup(@RequestBody AdminSignupParam adminSignupParam) {
        if (adminService.signup(
                adminSignupParam.getEmail(),
                adminSignupParam.getPassword(),
                adminSignupParam.getFirstName(),
                adminSignupParam.getLastName())) {
            Result result = ResultGenerator.genSuccessResult();
            result.setData("Signup success.");
            return result;
        } else {
            Result result = ResultGenerator.genFailResult();
            result.setData("Email has been used, please choose another email.");
            return result;
        }
    }

    @PostMapping("/delete/user")
    public Result<String> deleteUserByEmail(@RequestBody UserIdentifyParam userIdentifyParam) {
        if (adminService.deleteUserByEmail(userIdentifyParam.getEmail())) {
            Result result = ResultGenerator.genSuccessResult();
            result.setData("Delete " + userIdentifyParam.getEmail() + " success.");
            return result;
        } else {
            Result result = ResultGenerator.genFailResult();
            result.setData("No such user.");
            return result;
        }
    }
}
