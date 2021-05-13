package com.ssafy.edu.model.beacon;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BeaconCreateRequest {
    String line;
    String equipment;
    double temperatureMax;
    double temperatureMin;
    double humidityMax;
    double humidityMin;
    int signalPower;
    int sensing;
}
