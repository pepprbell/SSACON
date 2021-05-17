package com.ssafy.edu.service.monitoring;

import com.ssafy.edu.model.monitoring.MonitoringResponse;
import org.springframework.http.ResponseEntity;

public interface MonitoringService {
    public ResponseEntity<MonitoringResponse> getBeaconAll();
}
