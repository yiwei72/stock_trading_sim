package com.company.project.pojo;

public class User {
    /**
     * This field was generated by MyBatis Generator. This field corresponds to the database column
     * t_user.email
     *
     * @mbg.generated Mon Jan 23 01:03:00 EST 2023
     */
    private String email;

    /**
     * This field was generated by MyBatis Generator. This field corresponds to the database column
     * t_user.password
     *
     * @mbg.generated Mon Jan 23 01:03:00 EST 2023
     */
    private String password;

    /**
     * This field was generated by MyBatis Generator. This field corresponds to the database column
     * t_user.first_name
     *
     * @mbg.generated Mon Jan 23 01:03:00 EST 2023
     */
    private String firstName;

    /**
     * This field was generated by MyBatis Generator. This field corresponds to the database column
     * t_user.last_name
     *
     * @mbg.generated Mon Jan 23 01:03:00 EST 2023
     */
    private String lastName;

    /**
     * This field was generated by MyBatis Generator. This field corresponds to the database column
     * t_user.balance
     *
     * @mbg.generated Mon Jan 23 01:03:00 EST 2023
     */
    private Double balance;

    /**
     * This method was generated by MyBatis Generator. This method returns the value of the database
     * column t_user.email
     *
     * @return the value of t_user.email
     * @mbg.generated Mon Jan 23 01:03:00 EST 2023
     */
    public String getEmail() {
        return email;
    }

    /**
     * This method was generated by MyBatis Generator. This method sets the value of the database
     * column t_user.email
     *
     * @param email the value for t_user.email
     * @mbg.generated Mon Jan 23 01:03:00 EST 2023
     */
    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }

    /**
     * This method was generated by MyBatis Generator. This method returns the value of the database
     * column t_user.password
     *
     * @return the value of t_user.password
     * @mbg.generated Mon Jan 23 01:03:00 EST 2023
     */
    public String getPassword() {
        return password;
    }

    /**
     * This method was generated by MyBatis Generator. This method sets the value of the database
     * column t_user.password
     *
     * @param password the value for t_user.password
     * @mbg.generated Mon Jan 23 01:03:00 EST 2023
     */
    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    /**
     * This method was generated by MyBatis Generator. This method returns the value of the database
     * column t_user.first_name
     *
     * @return the value of t_user.first_name
     * @mbg.generated Mon Jan 23 01:03:00 EST 2023
     */
    public String getFirstName() {
        return firstName;
    }

    /**
     * This method was generated by MyBatis Generator. This method sets the value of the database
     * column t_user.first_name
     *
     * @param firstName the value for t_user.first_name
     * @mbg.generated Mon Jan 23 01:03:00 EST 2023
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName == null ? null : firstName.trim();
    }

    /**
     * This method was generated by MyBatis Generator. This method returns the value of the database
     * column t_user.last_name
     *
     * @return the value of t_user.last_name
     * @mbg.generated Mon Jan 23 01:03:00 EST 2023
     */
    public String getLastName() {
        return lastName;
    }

    /**
     * This method was generated by MyBatis Generator. This method sets the value of the database
     * column t_user.last_name
     *
     * @param lastName the value for t_user.last_name
     * @mbg.generated Mon Jan 23 01:03:00 EST 2023
     */
    public void setLastName(String lastName) {
        this.lastName = lastName == null ? null : lastName.trim();
    }

    /**
     * This method was generated by MyBatis Generator. This method returns the value of the database
     * column t_user.balance
     *
     * @return the value of t_user.balance
     * @mbg.generated Mon Jan 23 01:03:00 EST 2023
     */
    public Double getBalance() {
        return balance;
    }

    /**
     * This method was generated by MyBatis Generator. This method sets the value of the database
     * column t_user.balance
     *
     * @param balance the value for t_user.balance
     * @mbg.generated Mon Jan 23 01:03:00 EST 2023
     */
    public void setBalance(Double balance) {
        this.balance = balance;
    }

    @Override
    public String toString() {
        return "User{"
                + "email='"
                + email
                + '\''
                + ", password='"
                + password
                + '\''
                + ", firstName='"
                + firstName
                + '\''
                + ", lastName='"
                + lastName
                + '\''
                + ", balance="
                + balance
                + '}';
    }
}
