package com.company.project.pojo;

public class HoldingKey {
    /**
     * This field was generated by MyBatis Generator. This field corresponds to the database column
     * t_holding.email
     *
     * @mbg.generated Mon Jan 23 01:03:00 EST 2023
     */
    private String email;

    /**
     * This field was generated by MyBatis Generator. This field corresponds to the database column
     * t_holding.stock_symbol
     *
     * @mbg.generated Mon Jan 23 01:03:00 EST 2023
     */
    private String stockSymbol;

    /**
     * This method was generated by MyBatis Generator. This method returns the value of the database
     * column t_holding.email
     *
     * @return the value of t_holding.email
     * @mbg.generated Mon Jan 23 01:03:00 EST 2023
     */
    public String getEmail() {
        return email;
    }

    /**
     * This method was generated by MyBatis Generator. This method sets the value of the database
     * column t_holding.email
     *
     * @param email the value for t_holding.email
     * @mbg.generated Mon Jan 23 01:03:00 EST 2023
     */
    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }

    /**
     * This method was generated by MyBatis Generator. This method returns the value of the database
     * column t_holding.stock_symbol
     *
     * @return the value of t_holding.stock_symbol
     * @mbg.generated Mon Jan 23 01:03:00 EST 2023
     */
    public String getStockSymbol() {
        return stockSymbol;
    }

    /**
     * This method was generated by MyBatis Generator. This method sets the value of the database
     * column t_holding.stock_symbol
     *
     * @param stockSymbol the value for t_holding.stock_symbol
     * @mbg.generated Mon Jan 23 01:03:00 EST 2023
     */
    public void setStockSymbol(String stockSymbol) {
        this.stockSymbol = stockSymbol == null ? null : stockSymbol.trim();
    }
}
