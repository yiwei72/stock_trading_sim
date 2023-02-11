package com.company.project.controllers;

import com.company.project.controllers.param.TransactionInfoParam;
import com.company.project.service.TransactionService;
import com.company.project.util.Result;
import com.company.project.util.ResultGenerator;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@Api
@RequestMapping("/transaction")
public class TransactionController {
    @Resource
    private TransactionService transactionService;

    @PostMapping("/buy")
    public Result buy(@RequestBody TransactionInfoParam transactionInfoParam) {
        if (transactionService.buy(transactionInfoParam)) {
            return ResultGenerator.genSuccessResult();
        }
        else {
            return ResultGenerator.genFailResult();
        }
    }

    @PostMapping("/sell")
    public Result sell(@RequestBody TransactionInfoParam transactionInfoParam) {
        if (transactionService.sell(transactionInfoParam)) {
            return ResultGenerator.genSuccessResult();
        }
        else {
            return ResultGenerator.genFailResult();
        }
    }
}
