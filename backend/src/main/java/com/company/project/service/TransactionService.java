package com.company.project.service;

import com.company.project.controllers.param.TransactionInfoParam;
import com.company.project.pojo.Transaction;

import java.util.List;

public interface TransactionService {
    boolean buy(TransactionInfoParam transactionInfoParam);

    boolean sell(TransactionInfoParam transactionInfoParam);

    List<Transaction> log(String email);
}
