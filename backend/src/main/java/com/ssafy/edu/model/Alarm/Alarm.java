package com.ssafy.edu.model.Alarm;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Alarm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "alarm_id")
    private Long id;

    private String type;
    private String line;
    private String equipment;
    private String writer;
    private String description;
    private Date time;
    private String properBeaconId;
    private String submissionBeaconId;
    private double minProperHumidity;
    private double maxProperHumidity;
    private double minProperTemperature;
    private double maxProperTemperature;
    private double nowHumidity;
    private double nowTemperature;
    private String session;
    private double battery;
    private String userId;
    private boolean receive;
    private String beaconId;
    private String checkUserName;

}
