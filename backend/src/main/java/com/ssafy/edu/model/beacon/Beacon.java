package com.ssafy.edu.model.beacon;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.edu.model.equipment.Equipment;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Beacon {
    @Id
    private String beaconId;

    private String line;
    private String equipment;
    private String beaconName;
    private double tempMax;
    private double tempMin;
    private double humidtyMax;
    private double humidtyMin;
    private double beaconMoisture;
    private double beaconTemperature;
    private double beaconBattery;
    private int signalPower;
    private int sensing;
    private double xPos;
    private double yPos;

    @JsonManagedReference
    @OneToMany(mappedBy = "beacon", cascade = {CascadeType.ALL})
    List<BeaconUsers> users = new ArrayList<>();
}
