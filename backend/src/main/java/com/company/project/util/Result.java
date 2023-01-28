package com.company.project.util;

import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;

public class Result<T> implements Serializable {

    // RESULT_CODE_SUCCESS = 200
    // RESULT_CODE_SERVER_ERROR = 500
    // Extend if needed
    @ApiModelProperty("result code")
    private int resultCode;

    // DEFAULT_SUCCESS_MESSAGE = "SUCCESS"
    // DEFAULT_FAIL_MESSAGE = "FAIL"
    @ApiModelProperty("result message")
    private String message;

    // can be any object needed
    // default null
    @ApiModelProperty("result data")
    private T data;

    public Result() {}

    public Result(int resultCode, String message) {
        this.resultCode = resultCode;
        this.message = message;
    }

    public int getResultCode() {
        return resultCode;
    }

    public void setResultCode(int resultCode) {
        this.resultCode = resultCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "Result{"
                + "resultCode="
                + resultCode
                + ", message='"
                + message
                + '\''
                + ", data="
                + data
                + '}';
    }
}
