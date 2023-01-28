package com.company.project.controllers.param;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import java.io.Serializable;

@Data
public class AdminLoginParam implements Serializable {
    @ApiModelProperty("email")
    @NotEmpty(message = "email can't be empty")
    private String email;

    @ApiModelProperty("password")
    @NotEmpty(message = "password can't be empty")
    private String password;
}
