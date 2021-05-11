package com.ssafy.edu.model.message;

import io.swagger.annotations.ApiModelProperty;

public class MessageResponse {
    @ApiModelProperty(value = "status", position = 1)
    public boolean status;

    @ApiModelProperty(value = "data", position = 2)
    public Object data;
}
