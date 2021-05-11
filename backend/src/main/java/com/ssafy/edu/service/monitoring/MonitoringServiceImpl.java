package com.ssafy.edu.service.monitoring;

import com.ssafy.edu.model.beacon.Beacon;
import com.ssafy.edu.model.beacon.BeaconUsers;
import com.ssafy.edu.model.monitoring.BeaconMonitoring;
import com.ssafy.edu.model.monitoring.MonitoringResponse;
import com.ssafy.edu.model.user.User;
import com.ssafy.edu.repository.beacon.BeaconRepository;
import com.ssafy.edu.repository.beaconusers.BeaconUsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class MonitoringServiceImpl implements MonitoringService{
    @Autowired
    BeaconRepository beaconRepository;

    @Autowired
    BeaconUsersRepository beaconUsersRepository;

    @Override
    public ResponseEntity<MonitoringResponse> getBeaconAll(){
        ResponseEntity response;
        MonitoringResponse ret = new MonitoringResponse();
        List<Beacon> beacons = beaconRepository.findAll();
        List<BeaconMonitoring> finRet = new ArrayList<>();
        for(Beacon i: beacons){
            BeaconMonitoring tmp = new BeaconMonitoring();
            List<BeaconUsers> beaconUsers = beaconUsersRepository.findByBeacon(i);
            List<User> tmp1 = new ArrayList<>();
            if(!beaconUsers.isEmpty()){
                for(BeaconUsers j: beaconUsers){
                    Date tmptime = j.getUser().getLastSignal();
                    Date timeNow = Date.from(Instant.now());
                    if(timeNow.getTime() - tmptime.getTime() < 300000){
                        tmp1.add(j.getUser());
                    }
                }
            }
            tmp.setBeaconId(i.getBeaconId());
            tmp.setBeaconName(i.getBeaconName());
            tmp.setBeaconMoisture(i.getBeaconMoisture());
            tmp.setBeaconTemperature(i.getBeaconTemperature());
            tmp.setBeaconBattery(i.getBeaconBattery());
            tmp.setWorkers(tmp1);
            finRet.add(tmp);
        }
        ret.data = finRet;
        ret.status = true;
        response = new ResponseEntity<>(ret, HttpStatus.OK);
        return response;
    }
}
