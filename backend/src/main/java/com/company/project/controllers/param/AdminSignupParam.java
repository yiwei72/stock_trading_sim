package com.company.project.controllers.param;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import java.io.Serializable;

@Data
public class AdminSignupParam implements Serializable {
    @ApiModelProperty("email")
    @NotEmpty(message = "email can't be empty")
    private String email;

    @ApiModelProperty("password")
    @NotEmpty(message = "password can't be empty")
    private String password;

    @ApiModelProperty("firstName")
    @NotEmpty(message = "firstName can't be empty")
    private String firstName;

    @ApiModelProperty("lastName")
    @NotEmpty(message = "lastName can't be empty")
    private String lastName;
}
