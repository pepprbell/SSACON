package com.ssafy.edu.model.beacon;

import io.swagger.annotations.ApiModelProperty;

public class BeaconResponse {
    @ApiModelProperty(value = "status", position = 1)
    public  boolean status;

    @ApiModelProperty(value = "data", position = 2)
    public Object data;
}
