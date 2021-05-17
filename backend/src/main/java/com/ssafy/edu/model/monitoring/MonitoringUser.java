package com.ssafy.edu.model.monitoring;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
public class MonitoringUser {
    String userId;
    String userName;
    String partName;
    Date lastSignal;
}
