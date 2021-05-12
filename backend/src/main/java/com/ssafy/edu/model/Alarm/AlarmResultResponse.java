package com.ssafy.edu.model.Alarm;


import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
public class AlarmResultResponse {
    Long id;
    String type;
    String line;
    String equipment;
    String beaconId;
    String writer;
    String description;
    Date time;
    String properBeaconId;
    String submissionBeaconId;
    double minProperHumidity;
    double maxProperHumidity;
    double minProperTemperature;
    double maxProperTemperature;
    double nowHumidity;
    double nowTemperature;
    String session;
    double battery;
}
