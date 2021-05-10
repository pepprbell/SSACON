package com.ssafy.edu.model.beacon;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BeaconCreateRequest {
    String line;
    String equipment;
    String name;
    double temperatureMax;
    double temperatureMin;
    double humidityMax;
    double humidityMin;
    double temperature;
    double humidity;
    double vbatt;
}
