package com.company.project.service;

import com.company.project.controllers.param.TransactionInfoParam;

public interface TransactionService {
    boolean buy(TransactionInfoParam transactionInfoParam);

    boolean sell(TransactionInfoParam transactionInfoParam);
}
