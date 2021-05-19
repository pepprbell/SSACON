package com.ssafy.edu.model.beacon;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BeaconInfoResponse {
    String beacon_id;
    String line;
    String equipment;
    double temperatureMax;
    double temperatureMin;
    double humidityMax;
    double humidityMin;
    int signalPower;
    int sensing;
}
