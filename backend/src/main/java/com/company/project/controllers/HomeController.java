package com.company.project.controllers;

import com.company.project.mapper.UserMapper;
import com.company.project.pojo.Greeting;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @Autowired private UserMapper userMapper;

    @GetMapping("/")
    public Greeting showHome(String name, Model model) {
        return new Greeting(1, userMapper.selectByPrimaryKey("admin@uwaterloo.ca").getEmail());
    }
}
