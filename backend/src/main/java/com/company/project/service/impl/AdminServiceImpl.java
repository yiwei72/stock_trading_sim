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
    private static final Double DEFAULT_INIT_BALANCE = 100000000.0;

    @Resource
    private UserMapper userMapper;

    @Override
    public boolean login(String email, String password) {
        UserExample userExample = new UserExample();
        userExample.createCriteria().andEmailEqualTo(email).andPasswordEqualTo(password);
        List<User> userList = userMapper.selectByExample(userExample);
        return !userList.isEmpty();
    }

    @Override
    public boolean signup(String email, String password, String firstName, String lastName) {
        if (userMapper.selectByPrimaryKey(email) != null) {
            return false;
        }

        User user = new User(email, password, firstName, lastName, DEFAULT_INIT_BALANCE);
        userMapper.insertSelective(user);
        return true;
    }

    @Override
    public boolean deleteUserByEmail(String email) {
        if (userMapper.selectByPrimaryKey(email) == null) {
            return false;
        }

        userMapper.deleteByPrimaryKey(email);
        return true;
    }
}
