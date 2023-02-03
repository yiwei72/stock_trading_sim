package com.company.project.controllers;

import com.company.project.controllers.param.UserIdentifyParam;
import com.company.project.pojo.UserInformation;
import com.company.project.service.UserService;
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
@RequestMapping("/user")
public class UserController {

    @Resource
    private UserService userService;

    @PostMapping("/home")
    public Result<UserInformation> showUserHome(@RequestBody UserIdentifyParam userIdentifyParam) {
        UserInformation userInformation = userService.showUserHome(userIdentifyParam.getEmail());
        if (userInformation != null) {
            return ResultGenerator.genSuccessResult(userInformation);
        }
        else {
            return ResultGenerator.genFailResult();
        }
    }
}
