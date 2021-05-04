package com.ssafy.edu.model.beacon;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.edu.model.user.User;
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

    private int beaconBattery;

    @Builder.Default
    @OneToMany(mappedBy = "beacon", cascade = {CascadeType.ALL})
    private List<User> wokerList = new ArrayList<>();
}
