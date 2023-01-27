package com.company.project.controllers;

import com.company.project.controllers.param.AdminLoginParam;
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

    @Resource
    private AdminService adminService;

    @PostMapping("/login")
    public Result<String> login(@RequestBody AdminLoginParam adminLoginParam) {
        if (adminService.login(adminLoginParam.getEmail(), adminLoginParam.getPassword())) {
            Result result = ResultGenerator.genSuccessResult();
            result.setData("Login success.");
            return result;
        }
        else {
            Result result = ResultGenerator.genFailResult();
            result.setData("Email or password is incorrect.");
            return result;
        }
    }

}
