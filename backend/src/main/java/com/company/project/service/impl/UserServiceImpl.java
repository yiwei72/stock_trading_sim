package com.company.project.service.impl;

import com.company.project.mapper.HoldingMapper;
import com.company.project.mapper.UserMapper;
import com.company.project.pojo.HoldingExample;
import com.company.project.pojo.User;
import com.company.project.pojo.UserInformation;
import com.company.project.service.UserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class UserServiceImpl implements UserService {

    @Resource private UserMapper userMapper;

    @Resource private HoldingMapper holdingMapper;

    @Override
    public UserInformation showUserHome(String email) {
        User user = userMapper.selectByPrimaryKey(email);
        if (user == null) {
            return null;
        } else {
            UserInformation userInformation = new UserInformation();
            userInformation.setFirstName(user.getFirstName());
            userInformation.setLastName(user.getLastName());
            userInformation.setBalance(user.getBalance());
            HoldingExample holdingExample = new HoldingExample();
            holdingExample.createCriteria().andEmailEqualTo(email);
            userInformation.setHolding(holdingMapper.selectByExample(holdingExample));
            return userInformation;
        }
    }
}
