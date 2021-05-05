package com.ssafy.edu.model.monitoring;


import com.ssafy.edu.model.user.User;
import lombok.*;

import javax.persistence.Id;
import java.util.List;

@Getter
@Setter
public class BeaconMonitoring {
    @Id
    String beaconId;

    String beaconName;

    double beaconMoisture;

    double beaconTemperature;

    double beaconBattery;

    List<User> workers;
}
