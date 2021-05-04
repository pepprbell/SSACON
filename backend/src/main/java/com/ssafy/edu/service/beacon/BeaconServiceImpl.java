package com.ssafy.edu.service.beacon;


import com.amazonaws.services.dynamodbv2.xspec.B;
import com.ssafy.edu.model.beacon.Beacon;
import com.ssafy.edu.model.beacon.BeaconContent;
import com.ssafy.edu.model.beacon.BeaconResponse;
import com.ssafy.edu.model.beacon.BeaconScan;
import com.ssafy.edu.model.monitoring.BeaconMonitorResponse;
import com.ssafy.edu.model.monitoring.MonitoringResponse;
import com.ssafy.edu.model.user.User;
import com.ssafy.edu.repository.beacon.BeaconRepository;
import com.ssafy.edu.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BeaconServiceImpl implements BeaconService{
    @Autowired
    BeaconRepository beaconRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public ResponseEntity<BeaconResponse> getBeaconAll(){
        ResponseEntity response;
        BeaconResponse ret = new BeaconResponse();
        List<Beacon> beacons = beaconRepository.findAll();
        List<BeaconMonitorResponse> beaconMonitorResponses = new ArrayList<>();
        for(Beacon i:beacons){
            String tmp = i.getBeaconId();
            Beacon tmp1 = i;
            BeaconMonitorResponse t = new BeaconMonitorResponse();
            t.setId(tmp);
            t.setBeacon(tmp1);
            beaconMonitorResponses.add(t);
        }
        ret.data = beaconMonitorResponses;
        ret.status = true;
        response = new ResponseEntity<>(ret, HttpStatus.OK);
        return response;
    }

    @Override
    public ResponseEntity<BeaconResponse> createBeacon(String id, String name) {
        ResponseEntity response;
        BeaconResponse ret = new BeaconResponse();
        Beacon tmp = Beacon.builder()
                .beaconId(id)
                .beaconName(name)
                .build();
        Beacon t = beaconRepository.save(tmp);
        ret.data = t.getBeaconId();
        ret.status = true;
        response = new ResponseEntity<>(ret, HttpStatus.OK);
        return response;
    }

    @Override
    public ResponseEntity<BeaconResponse> scanBeacons(List<BeaconScan> beaconScanList, String userid){
        BeaconResponse ret = new BeaconResponse();
        List<String> ids = new ArrayList<>();
        Optional<User> userOpt = userRepository.findByUserId(userid);
        if(userOpt.isPresent()) {
            for (BeaconScan i : beaconScanList) {
                String id = i.getBeacon_id();
//                Optional<Beacon> beaconOpt = beaconRepository.findByBeaconId(id);
                BeaconContent content = i.getContent();
//                if(beaconOpt.isPresent()){
//                    beaconOpt.get().setBeaconTemperature(content.getTemperature());
//                    beaconOpt.get().setBeaconMoisture(content.getHumidity());
//                    List<User> tmpworkers = beaconOpt.get().getWokerList();
//                    tmpworkers.add(userOpt.get());
//                    beaconOpt.get().setWokerList(tmpworkers);
//                }
//                else{
//                    ret.status = false;
//                    return new ResponseEntity<>(ret, HttpStatus.OK);
//                 }
                ids.add(id);
            }
            ret.data = ids;
            ret.status = true;
            return new ResponseEntity<>(ret, HttpStatus.OK);
        }
        else{
            ret.status = false;
            return new ResponseEntity<>(ret, HttpStatus.OK);
        }
    }
}
