package com.ssafy.edu.model.monitoring;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class MonitoringTotal {
    List<BeaconMonitoring> beacons;
    List<String> totalLoginWorker;
    List<String> onSignalWorker;
    List<String> nonSignalWorker;
}
