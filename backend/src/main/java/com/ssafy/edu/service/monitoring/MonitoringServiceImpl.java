package com.ssafy.edu.service.monitoring;

import com.ssafy.edu.model.beacon.Beacon;
import com.ssafy.edu.model.beacon.BeaconUsers;
import com.ssafy.edu.model.monitoring.MonitoringResponse;
import com.ssafy.edu.repository.blockusers.BeaconUsersRepository;
import com.ssafy.edu.repository.monitoring.MonitoringRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MonitoringServiceImpl implements MonitoringService{
    @Autowired
    MonitoringRepository monitoringRepository;

    @Autowired
    BeaconUsersRepository beaconUsersRepository;

    @Override
    public ResponseEntity<MonitoringResponse> getBeaconAll(){
        ResponseEntity response;
        MonitoringResponse ret = new MonitoringResponse();
        List<Beacon> beacons = monitoringRepository.findAll();
        List<Beacon> finRet = new ArrayList<>();
        for(Beacon i: beacons){
            Beacon tmp = new Beacon();
            List<BeaconUsers> beaconUsers = beaconUsersRepository.findByBeacon(i);
            tmp.setBeaconId(i.getBeaconId());
            tmp.setBeaconName(i.getBeaconName());
            tmp.setBeaconMoisture(i.getBeaconMoisture());
            tmp.setBeaconTemperature(i.getBeaconTemperature());
            tmp.setBeaconBattery(i.getBeaconBattery());
            tmp.setUsers(beaconUsers);
            finRet.add(tmp);
        }
        ret.data = finRet;
        ret.status = true;
        response = new ResponseEntity<>(ret, HttpStatus.OK);
        return response;
    }
}
