package com.company.project.controllers;

import com.company.project.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @Autowired
    private UserMapper userMapper;

    @GetMapping("/")
    public void showHome(String name, Model model) {
    }

}
