package com.ssafy.edu.model.Alarm;

import io.swagger.annotations.ApiModelProperty;

public class AlarmResponse {
    @ApiModelProperty(value = "status", position = 1)
    public boolean status;

    @ApiModelProperty(value = "data", position = 2)
    public Object data;
}
