package com.company.project.service.impl;

import com.company.project.mapper.UserMapper;
import com.company.project.pojo.User;
import com.company.project.pojo.UserExample;
import com.company.project.service.AdminService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {

    @Resource
    private UserMapper userMapper;

    @Override
    public boolean login(String email, String password) {
        UserExample userExample = new UserExample();
        userExample.createCriteria().andEmailEqualTo(email).andPasswordEqualTo(password);
        List<User> userList = userMapper.selectByExample(userExample);
        return !userList.isEmpty();
    }
}
