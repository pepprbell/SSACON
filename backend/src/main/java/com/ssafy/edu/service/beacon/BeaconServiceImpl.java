package com.ssafy.edu.service.beacon;


import com.ssafy.edu.model.beacon.Beacon;
import com.ssafy.edu.model.beacon.BeaconContent;
import com.ssafy.edu.model.beacon.BeaconResponse;
import com.ssafy.edu.model.beacon.BeaconUsers;
import com.ssafy.edu.model.monitoring.BeaconMonitorResponse;
import com.ssafy.edu.model.user.User;
import com.ssafy.edu.repository.beacon.BeaconRepository;
import com.ssafy.edu.repository.blockusers.BeaconUsersRepository;
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

    @Autowired
    BeaconUsersRepository beaconUsersRepository;

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
    public ResponseEntity<BeaconResponse> scanBeacons(List<BeaconContent> beaconScanList, String userid){
        BeaconResponse ret = new BeaconResponse();
        List<String> ids = new ArrayList<>();
        Optional<User> userOpt = userRepository.findByUserId(userid);
        if(userOpt.isPresent()) {
            List<BeaconUsers> beaconUsersOptU = beaconUsersRepository.findByUser(userOpt.get());
            for(BeaconUsers i: beaconUsersOptU){
                beaconUsersRepository.delete(i);
            }
            for (BeaconContent i : beaconScanList) {
                String id = i.getBeacon_id();
                Optional<Beacon> beaconOpt = beaconRepository.findByBeaconId(id);
                BeaconUsers beaconUsers = new BeaconUsers();
                beaconUsers = BeaconUsers.builder()
                        .user(userOpt.get())
                        .beacon(beaconOpt.get())
                        .build();
                BeaconUsers save = beaconUsersRepository.save(beaconUsers);
                if(beaconOpt.isPresent()){
                    beaconOpt.get().setBeaconTemperature(i.getTemperature());
                    beaconOpt.get().setBeaconMoisture(i.getHumidity());
                    beaconOpt.get().setBeaconBattery(i.getBattery());
                }
                else{
                    ret.status = false;
                    return new ResponseEntity<>(ret, HttpStatus.OK);
                }
                ids.add(id);
            }
            ret.data = ids;
            ret.status = true;
        }
        else{
            ret.status = false;
        }
        return new ResponseEntity<>(ret, HttpStatus.OK);
    }
}
