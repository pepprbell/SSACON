package com.ssafy.edu.model.beacon;


import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Valid
@ToString
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BeaconContent {
    String beacon_id;
    String beacon_name;
    double temperature;
    double humidity;
    double vbatt;
}
