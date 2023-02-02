package com.company.project.mapper;

import com.company.project.pojo.Transaction;
import com.company.project.pojo.TransactionExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface TransactionMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_transaction
     *
     * @mbg.generated Thu Feb 02 02:24:03 EST 2023
     */
    long countByExample(TransactionExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_transaction
     *
     * @mbg.generated Thu Feb 02 02:24:03 EST 2023
     */
    int deleteByExample(TransactionExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_transaction
     *
     * @mbg.generated Thu Feb 02 02:24:03 EST 2023
     */
    int deleteByPrimaryKey(Long serialNumber);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_transaction
     *
     * @mbg.generated Thu Feb 02 02:24:03 EST 2023
     */
    int insert(Transaction row);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_transaction
     *
     * @mbg.generated Thu Feb 02 02:24:03 EST 2023
     */
    int insertSelective(Transaction row);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_transaction
     *
     * @mbg.generated Thu Feb 02 02:24:03 EST 2023
     */
    List<Transaction> selectByExample(TransactionExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_transaction
     *
     * @mbg.generated Thu Feb 02 02:24:03 EST 2023
     */
    Transaction selectByPrimaryKey(Long serialNumber);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_transaction
     *
     * @mbg.generated Thu Feb 02 02:24:03 EST 2023
     */
    int updateByExampleSelective(@Param("row") Transaction row, @Param("example") TransactionExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_transaction
     *
     * @mbg.generated Thu Feb 02 02:24:03 EST 2023
     */
    int updateByExample(@Param("row") Transaction row, @Param("example") TransactionExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_transaction
     *
     * @mbg.generated Thu Feb 02 02:24:03 EST 2023
     */
    int updateByPrimaryKeySelective(Transaction row);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_transaction
     *
     * @mbg.generated Thu Feb 02 02:24:03 EST 2023
     */
    int updateByPrimaryKey(Transaction row);
}