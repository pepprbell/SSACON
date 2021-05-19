package com.ssafy.edu.model.monitoring;


import com.ssafy.edu.model.beacon.Beacon;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BeaconMonitorResponse {
    String id;
    Beacon beacon;
}
