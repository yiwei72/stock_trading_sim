package com.company.project.controllers.param;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import java.io.Serializable;

@Data
public class UserIdentifyParam implements Serializable {
    @ApiModelProperty("email")
    @NotEmpty(message = "email can't be empty")
    private String email;
}
