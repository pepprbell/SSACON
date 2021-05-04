package com.ssafy.edu.service.beacon;

import com.ssafy.edu.model.beacon.BeaconResponse;
import com.ssafy.edu.model.beacon.BeaconScan;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface BeaconService {
    public ResponseEntity<BeaconResponse> getBeaconAll();
    public ResponseEntity<BeaconResponse> createBeacon(String id, String name);
    public ResponseEntity<BeaconResponse> scanBeacons(List<BeaconScan> beaconScanList, String userid);
}
