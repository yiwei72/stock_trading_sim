package com.company.project.service.impl;

import com.company.project.controllers.param.TransactionInfoParam;
import com.company.project.mapper.HoldingMapper;
import com.company.project.mapper.TransactionMapper;
import com.company.project.mapper.UserMapper;
import com.company.project.pojo.*;
import com.company.project.service.TransactionService;
import com.company.project.util.PriceCalculator;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService {
    @Resource private UserMapper userMapper;
    @Resource private HoldingMapper holdingMapper;
    @Resource private TransactionMapper transactionMapper;

    @Override
    public boolean buy(TransactionInfoParam transactionInfoParam) {
        String email = transactionInfoParam.getEmail();
        Integer type = transactionInfoParam.getType();
        String stockSymbol = transactionInfoParam.getStockSymbol();
        Double tradePrice = transactionInfoParam.getPrice();
        Long tradeQuantity = transactionInfoParam.getQuantity();
        User user = userMapper.selectByPrimaryKey(email);
        Double prevBalance = user.getBalance();
        Long tradeTimeStamp = System.currentTimeMillis();

        if (prevBalance < tradePrice * tradeQuantity) {
            return false;
        }

        // add a row to Transaction table
        Transaction transaction = new Transaction();
        transaction.setType(type);
        transaction.setEmail(email);
        transaction.setStockSymbol(stockSymbol);
        transaction.setTimeStamp(tradeTimeStamp);
        transaction.setPrice(tradePrice);
        transaction.setQuantity(tradeQuantity);
        transactionMapper.insertSelective(transaction);

        // update user balance
        user.setBalance(prevBalance - tradePrice * tradeQuantity);
        userMapper.updateByPrimaryKeySelective(user);

        // update holding
        HoldingExample holdingExample = new HoldingExample();
        holdingExample.createCriteria().andEmailEqualTo(email).andStockSymbolEqualTo(stockSymbol);
        List<Holding> holdingList = holdingMapper.selectByExample(holdingExample);
        if (holdingList.isEmpty()) {
            Holding newHolding = new Holding();
            newHolding.setEmail(email);
            newHolding.setStockSymbol(stockSymbol);
            newHolding.setPrice(tradePrice);
            newHolding.setQuantity(tradeQuantity);
            newHolding.setTimeStamp(tradeTimeStamp);
            holdingMapper.insertSelective(newHolding);
        } else {
            Holding holding = holdingList.get(0);
            Double prevAvePrice = holding.getPrice();
            Long prevQuantity = holding.getQuantity();
            holding.setPrice(
                    PriceCalculator.updateAvePrice(
                            prevAvePrice, prevQuantity, tradePrice, tradeQuantity, type));
            holding.setQuantity(prevQuantity + tradeQuantity);
            holding.setTimeStamp(tradeTimeStamp);
            holdingMapper.updateByExampleSelective(holding, holdingExample);
        }

        return true;
    }

    @Override
    public boolean sell(TransactionInfoParam transactionInfoParam) {
        String email = transactionInfoParam.getEmail();
        Integer type = transactionInfoParam.getType();
        String stockSymbol = transactionInfoParam.getStockSymbol();
        Double tradePrice = transactionInfoParam.getPrice();
        Long tradeQuantity = transactionInfoParam.getQuantity();
        User user = userMapper.selectByPrimaryKey(email);
        Double prevBalance = user.getBalance();
        Long tradeTimeStamp = System.currentTimeMillis();

        HoldingExample holdingExample = new HoldingExample();
        holdingExample.createCriteria().andEmailEqualTo(email).andStockSymbolEqualTo(stockSymbol);
        List<Holding> holdingList = holdingMapper.selectByExample(holdingExample);
        if (holdingList.isEmpty()) {
            return false;
        }
        Holding holding = holdingList.get(0);
        Long prevQuantity = holding.getQuantity();
        if (prevQuantity < tradeQuantity) {
            return false;
        }

        // add a row to Transaction table
        Transaction transaction = new Transaction();
        transaction.setType(type);
        transaction.setEmail(email);
        transaction.setStockSymbol(stockSymbol);
        transaction.setTimeStamp(tradeTimeStamp);
        transaction.setPrice(tradePrice);
        transaction.setQuantity(tradeQuantity);
        transactionMapper.insertSelective(transaction);

        // update user balance
        user.setBalance(prevBalance + tradePrice * tradeQuantity);
        userMapper.updateByPrimaryKeySelective(user);

        // update holding
        if (prevQuantity.equals(tradeQuantity)) {
            holdingMapper.deleteByExample(holdingExample);
        } else {
            holding.setQuantity(prevQuantity - tradeQuantity);
            holding.setTimeStamp(tradeTimeStamp);
            holdingMapper.updateByExampleSelective(holding, holdingExample);
        }

        return true;
    }

    @Override
    public List<Transaction> log(String email) {
        User user = userMapper.selectByPrimaryKey(email);
        if (user == null) {
            return null;
        } else {
            TransactionExample transactionExample = new TransactionExample();
            transactionExample.createCriteria().andEmailEqualTo(email);
            return transactionMapper.selectByExample(transactionExample);
        }
    }
}
