package com.company.project.mapper;

import com.company.project.pojo.Holding;
import com.company.project.pojo.HoldingExample;
import com.company.project.pojo.HoldingKey;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface HoldingMapper {
  /**
   * This method was generated by MyBatis Generator. This method corresponds to the database table
   * t_holding
   *
   * @mbg.generated Mon Jan 23 01:03:00 EST 2023
   */
  long countByExample(HoldingExample example);

  /**
   * This method was generated by MyBatis Generator. This method corresponds to the database table
   * t_holding
   *
   * @mbg.generated Mon Jan 23 01:03:00 EST 2023
   */
  int deleteByExample(HoldingExample example);

  /**
   * This method was generated by MyBatis Generator. This method corresponds to the database table
   * t_holding
   *
   * @mbg.generated Mon Jan 23 01:03:00 EST 2023
   */
  int deleteByPrimaryKey(HoldingKey key);

  /**
   * This method was generated by MyBatis Generator. This method corresponds to the database table
   * t_holding
   *
   * @mbg.generated Mon Jan 23 01:03:00 EST 2023
   */
  int insert(Holding row);

  /**
   * This method was generated by MyBatis Generator. This method corresponds to the database table
   * t_holding
   *
   * @mbg.generated Mon Jan 23 01:03:00 EST 2023
   */
  int insertSelective(Holding row);

  /**
   * This method was generated by MyBatis Generator. This method corresponds to the database table
   * t_holding
   *
   * @mbg.generated Mon Jan 23 01:03:00 EST 2023
   */
  List<Holding> selectByExample(HoldingExample example);

  /**
   * This method was generated by MyBatis Generator. This method corresponds to the database table
   * t_holding
   *
   * @mbg.generated Mon Jan 23 01:03:00 EST 2023
   */
  Holding selectByPrimaryKey(HoldingKey key);

  /**
   * This method was generated by MyBatis Generator. This method corresponds to the database table
   * t_holding
   *
   * @mbg.generated Mon Jan 23 01:03:00 EST 2023
   */
  int updateByExampleSelective(@Param("row") Holding row, @Param("example") HoldingExample example);

  /**
   * This method was generated by MyBatis Generator. This method corresponds to the database table
   * t_holding
   *
   * @mbg.generated Mon Jan 23 01:03:00 EST 2023
   */
  int updateByExample(@Param("row") Holding row, @Param("example") HoldingExample example);

  /**
   * This method was generated by MyBatis Generator. This method corresponds to the database table
   * t_holding
   *
   * @mbg.generated Mon Jan 23 01:03:00 EST 2023
   */
  int updateByPrimaryKeySelective(Holding row);

  /**
   * This method was generated by MyBatis Generator. This method corresponds to the database table
   * t_holding
   *
   * @mbg.generated Mon Jan 23 01:03:00 EST 2023
   */
  int updateByPrimaryKey(Holding row);
}
