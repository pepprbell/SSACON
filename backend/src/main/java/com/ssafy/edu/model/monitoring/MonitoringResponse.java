package com.ssafy.edu.model.monitoring;

import io.swagger.annotations.ApiModelProperty;

public class MonitoringResponse {
    @ApiModelProperty(value = "status", position = 1)
    public  boolean status;

    @ApiModelProperty(value = "data", position = 2)
    public Object data;

}
