package com.company.project.pojo;

public class Holding extends HoldingKey {
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column t_holding.price
     *
     * @mbg.generated Mon Jan 23 01:03:00 EST 2023
     */
    private Double price;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column t_holding.quantity
     *
     * @mbg.generated Mon Jan 23 01:03:00 EST 2023
     */
    private Long quantity;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column t_holding.time_stamp
     *
     * @mbg.generated Mon Jan 23 01:03:00 EST 2023
     */
    private Long timeStamp;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column t_holding.price
     *
     * @return the value of t_holding.price
     *
     * @mbg.generated Mon Jan 23 01:03:00 EST 2023
     */
    public Double getPrice() {
        return price;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column t_holding.price
     *
     * @param price the value for t_holding.price
     *
     * @mbg.generated Mon Jan 23 01:03:00 EST 2023
     */
    public void setPrice(Double price) {
        this.price = price;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column t_holding.quantity
     *
     * @return the value of t_holding.quantity
     *
     * @mbg.generated Mon Jan 23 01:03:00 EST 2023
     */
    public Long getQuantity() {
        return quantity;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column t_holding.quantity
     *
     * @param quantity the value for t_holding.quantity
     *
     * @mbg.generated Mon Jan 23 01:03:00 EST 2023
     */
    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column t_holding.time_stamp
     *
     * @return the value of t_holding.time_stamp
     *
     * @mbg.generated Mon Jan 23 01:03:00 EST 2023
     */
    public Long getTimeStamp() {
        return timeStamp;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column t_holding.time_stamp
     *
     * @param timeStamp the value for t_holding.time_stamp
     *
     * @mbg.generated Mon Jan 23 01:03:00 EST 2023
     */
    public void setTimeStamp(Long timeStamp) {
        this.timeStamp = timeStamp;
    }
}