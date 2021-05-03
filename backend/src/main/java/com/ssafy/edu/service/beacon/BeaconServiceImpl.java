package com.ssafy.edu.service.beacon;


import com.amazonaws.services.dynamodbv2.xspec.B;
import com.ssafy.edu.model.beacon.Beacon;
import com.ssafy.edu.model.beacon.BeaconResponse;
import com.ssafy.edu.repository.beacon.BeaconRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BeaconServiceImpl implements BeaconService{
    @Autowired
    BeaconRepository beaconRepository;

    @Override
    public ResponseEntity<BeaconResponse> getBeaconAll(){
        ResponseEntity response;
        BeaconResponse ret = new BeaconResponse();
        List<Beacon> beacons = beaconRepository.findAll();
        ret.data = beacons;
        ret.status = true;
        response = new ResponseEntity<>(ret, HttpStatus.OK);
        return response;
    }

    @Override
    public ResponseEntity<BeaconResponse> createBeacon(String id, String name) {
        ResponseEntity response;
        BeaconResponse ret = new BeaconResponse();
        Beacon tmp = Beacon.builder()
                .id(id)
                .name(name)
                .build();
        Beacon t = beaconRepository.save(tmp);
        ret.data = t.getId();
        ret.status = true;
        response = new ResponseEntity<>(ret, HttpStatus.OK);
        return response;
    }
}
