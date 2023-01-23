package com.company.project;

import com.company.project.mapper.UserMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.sql.DataSource;

@SpringBootTest
class DatabaseTests {

    @Autowired
    DataSource dataSource;
    @Autowired
    private UserMapper userMapper;

    @Test
    void testConnection() {
        System.out.println(userMapper.selectByExample(null).toString());
    }

}
