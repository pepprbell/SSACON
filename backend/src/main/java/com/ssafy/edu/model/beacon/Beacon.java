package com.ssafy.edu.model.beacon;


import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    private String beaconName;

    private double beaconMoisture;

    private double beaconTemperature;

    private double beaconBattery;

    @JsonManagedReference
    @OneToMany(mappedBy = "beacon", cascade = {CascadeType.ALL})
    List<BeaconUsers> users = new ArrayList<>();
}