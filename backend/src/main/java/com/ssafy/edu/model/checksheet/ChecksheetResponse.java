package com.ssafy.edu.model.checksheet;

import io.swagger.annotations.ApiModelProperty;

public class ChecksheetResponse {
    @ApiModelProperty(value = "status", position = 1)
    public boolean status;

    @ApiModelProperty(value = "data", position = 2)
    public Object data;
}
