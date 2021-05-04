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
public class BeaconScan {
    @ApiModelProperty(required = true)
    @NotNull
    String beacon_id;

    @ApiModelProperty(required = true)
    @NotNull
    BeaconContent content;


}
