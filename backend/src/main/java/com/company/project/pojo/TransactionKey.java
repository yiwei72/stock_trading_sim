package com.company.project.pojo;

public class TransactionKey {
    /**
     * This field was generated by MyBatis Generator. This field corresponds to the database column
     * t_transaction.email
     *
     * @mbg.generated Mon Jan 23 01:03:00 EST 2023
     */
    private String email;

    /**
     * This field was generated by MyBatis Generator. This field corresponds to the database column
     * t_transaction.stock_symbol
     *
     * @mbg.generated Mon Jan 23 01:03:00 EST 2023
     */
    private String stockSymbol;

    /**
     * This field was generated by MyBatis Generator. This field corresponds to the database column
     * t_transaction.time_stamp
     *
     * @mbg.generated Mon Jan 23 01:03:00 EST 2023
     */
    private Long timeStamp;

    /**
     * This method was generated by MyBatis Generator. This method returns the value of the database
     * column t_transaction.email
     *
     * @return the value of t_transaction.email
     * @mbg.generated Mon Jan 23 01:03:00 EST 2023
     */
    public String getEmail() {
        return email;
    }

    /**
     * This method was generated by MyBatis Generator. This method sets the value of the database
     * column t_transaction.email
     *
     * @param email the value for t_transaction.email
     * @mbg.generated Mon Jan 23 01:03:00 EST 2023
     */
    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }

    /**
     * This method was generated by MyBatis Generator. This method returns the value of the database
     * column t_transaction.stock_symbol
     *
     * @return the value of t_transaction.stock_symbol
     * @mbg.generated Mon Jan 23 01:03:00 EST 2023
     */
    public String getStockSymbol() {
        return stockSymbol;
    }

    /**
     * This method was generated by MyBatis Generator. This method sets the value of the database
     * column t_transaction.stock_symbol
     *
     * @param stockSymbol the value for t_transaction.stock_symbol
     * @mbg.generated Mon Jan 23 01:03:00 EST 2023
     */
    public void setStockSymbol(String stockSymbol) {
        this.stockSymbol = stockSymbol == null ? null : stockSymbol.trim();
    }

    /**
     * This method was generated by MyBatis Generator. This method returns the value of the database
     * column t_transaction.time_stamp
     *
     * @return the value of t_transaction.time_stamp
     * @mbg.generated Mon Jan 23 01:03:00 EST 2023
     */
    public Long getTimeStamp() {
        return timeStamp;
    }

    /**
     * This method was generated by MyBatis Generator. This method sets the value of the database
     * column t_transaction.time_stamp
     *
     * @param timeStamp the value for t_transaction.time_stamp
     * @mbg.generated Mon Jan 23 01:03:00 EST 2023
     */
    public void setTimeStamp(Long timeStamp) {
        this.timeStamp = timeStamp;
    }
}
