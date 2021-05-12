package com.ssafy.edu.model.beacon;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BeaconCreateRequest {
    String equipment_id;
//    String name;
    String line;
    String equipment;
    double temperatureMax;
    double temperatureMin;
    double humidityMax;
    double humidityMin;
//    double temperature;
//    double humidity;
//    double vbatt;
    int signalPower;
    int sensing;
    int adv;
}
