package com.company.project.pojo;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

public class UserInformation implements Serializable {

    private String firstName;
    private String lastName;
    private Double balance;
    private List<Holding> holding;

    public UserInformation() {
    }

    public UserInformation(String firstName, String lastName, Double balance, List<Holding> holding) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.balance = balance;
        this.holding = holding;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public List<Holding> getHolding() {
        return holding;
    }

    public void setHolding(List<Holding> holding) {
        this.holding = holding;
    }

    @Override
    public String toString() {
        return "UserInformation{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", balance=" + balance +
                ", holding=" + holding +
                '}';
    }
}
