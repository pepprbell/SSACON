package com.ssafy.edu.service.beacon;

import com.ssafy.edu.model.beacon.BeaconResponse;
import org.springframework.http.ResponseEntity;

public interface BeaconService {
    public ResponseEntity<BeaconResponse> getBeaconAll();
    public ResponseEntity<BeaconResponse> createBeacon(String id, String name);
}
