package com.company.project.controllers.param;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import java.io.Serializable;

@Data
public class TransactionInfoParam implements Serializable {
    @ApiModelProperty("type")
    @NotEmpty(message = "type can't be empty")
    private Integer type; // buy=1, sell=-1

    @ApiModelProperty("email")
    @NotEmpty(message = "email can't be empty")
    private String email;

    @ApiModelProperty("stockSymbol")
    @NotEmpty(message = "stockSymbol can't be empty")
    private String stockSymbol;

    @ApiModelProperty("price")
    @NotEmpty(message = "price can't be empty")
    private Double price;

    @ApiModelProperty("quantity")
    @NotEmpty(message = "quantity can't be empty")
    private Long quantity;
}
