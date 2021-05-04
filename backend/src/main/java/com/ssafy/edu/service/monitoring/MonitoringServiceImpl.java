package com.ssafy.edu.service.monitoring;

import com.ssafy.edu.model.beacon.Beacon;
import com.ssafy.edu.model.monitoring.MonitoringResponse;
import com.ssafy.edu.repository.monitoring.MonitoringRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MonitoringServiceImpl implements MonitoringService{
    @Autowired
    MonitoringRepository monitoringRepository;

    @Override
    public ResponseEntity<MonitoringResponse> getBeaconAll(){
        ResponseEntity response;
        MonitoringResponse ret = new MonitoringResponse();
        List<Beacon> beacons = monitoringRepository.findAll();
        ret.data = beacons;
        ret.status = true;
        response = new ResponseEntity<>(ret, HttpStatus.OK);
        return response;
    }
}
