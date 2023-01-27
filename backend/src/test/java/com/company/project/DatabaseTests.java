package com.company.project;

import com.company.project.mapper.UserMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

@SpringBootTest
class DatabaseTests {

  @Autowired DataSource dataSource;
  @Autowired private UserMapper userMapper;

  @Test
  void testConnection() {
    Map<String, Object> fromAdminUser = new HashMap<>();
    fromAdminUser.put("id", 1);

    fromAdminUser.put("name", userMapper.selectByPrimaryKey("admin@uwaterloo.ca").getFirstName());
    System.out.println(fromAdminUser);
  }

  @Test
  void testConnectionByPojo() {
    System.out.println(userMapper.selectByPrimaryKey("admin@uwaterloo.ca").getEmail());
  }
}
