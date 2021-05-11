package com.ssafy.edu.service.beacon;


import com.ssafy.edu.model.beacon.*;
import com.ssafy.edu.model.equipment.Equipment;
import com.ssafy.edu.model.line.Line;
import com.ssafy.edu.model.line.LineInfo;
import com.ssafy.edu.model.monitoring.BeaconMonitorResponse;
import com.ssafy.edu.model.user.User;
import com.ssafy.edu.repository.beacon.BeaconRepository;
import com.ssafy.edu.repository.blockusers.BeaconUsersRepository;
import com.ssafy.edu.repository.equipment.EquipmentRepository;
import com.ssafy.edu.repository.line.LineRepository;
import com.ssafy.edu.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;

@Service
public class BeaconServiceImpl implements BeaconService{
    @Autowired
    BeaconRepository beaconRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    BeaconUsersRepository beaconUsersRepository;

    @Autowired
    LineRepository lineRepository;

    @Autowired
    EquipmentRepository equipmentRepository;

    @Override
    public ResponseEntity<BeaconResponse> getBeaconAll(){
        BeaconResponse ret = new BeaconResponse();
        List<Beacon> beacons = beaconRepository.findAll();
        BeaconList beaconList = new BeaconList();
        LineInfo lines = new LineInfo();
        List<String> beaconMonitorResponses = new ArrayList<>();
        List<String> l1 = new ArrayList<>();
        List<String> l2 = new ArrayList<>();
        for(Beacon i:beacons){
            String tmp = i.getBeaconId();
            beaconMonitorResponses.add(tmp);
        }
        beaconList.setBeacon_id(beaconMonitorResponses);
        List<Equipment> allequips = equipmentRepository.findAll();
        for(Equipment i: allequips){
            String tmp = i.getLineId();
            Optional<Line> line = lineRepository.findByLineId(tmp);
            if(line.get().getLineName() == "line_name1"){
                l1.add(tmp);
            }
            else if(line.get().getLineName() == "line_name2"){
                l2.add(tmp);
            }
        }
        lines.setLine_name1(l1);
        lines.setLine_name2(l2);
        beaconList.setBeacon_id(beaconMonitorResponses);
        beaconList.setLine_equipment(lines);
        ret.data = beaconList;
        ret.status = true;
        return new ResponseEntity<>(ret, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<BeaconResponse> createBeacon(String id, BeaconCreateRequest beaconCreateRequest) {
        BeaconResponse ret = new BeaconResponse();
        Beacon tmp = Beacon.builder()
                .beaconId(id)
                .line(beaconCreateRequest.getLine())
                .equipment(beaconCreateRequest.getEquipment())
                .beaconName(beaconCreateRequest.getName())
                .tempMax(beaconCreateRequest.getTemperatureMax())
                .tempMin(beaconCreateRequest.getTemperatureMin())
                .humidtyMax(beaconCreateRequest.getHumidityMax())
                .humidtyMin(beaconCreateRequest.getHumidityMin())
                .beaconMoisture(beaconCreateRequest.getHumidity())
                .beaconTemperature(beaconCreateRequest.getTemperature())
                .beaconBattery(beaconCreateRequest.getVbatt())
                .build();
        Beacon t = beaconRepository.save(tmp);
        ret.data = t.getBeaconId();
        ret.status = true;
        return new ResponseEntity<>(ret, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<BeaconResponse> scanBeacons(List<BeaconContent> beaconScanList, String userid){
        BeaconResponse ret = new BeaconResponse();
        List<String> ids = new ArrayList<>();
        Optional<User> userOpt = userRepository.findByUserId(userid);
        if(userOpt.isPresent()) {
            userOpt.get().setLastSignal(Date.from(Instant.now()));
            userRepository.save(userOpt.get());
            List<BeaconUsers> beaconUsersOptU = beaconUsersRepository.findByUser(userOpt.get());
            if(!beaconUsersOptU.isEmpty()) {
                for (BeaconUsers i : beaconUsersOptU) {
                    beaconUsersRepository.delete(i);
                }
            }
            List<String> tmpset = new ArrayList<>();
            Collections.reverse(beaconScanList);
            for (BeaconContent i : beaconScanList) {
                String id = i.getBeacon_id();
                Optional<Beacon> beaconOpt = beaconRepository.findByBeaconId(id);
                if(beaconOpt.isPresent()){
                    if(!tmpset.contains(id)) {
                        tmpset.add(id);
                        BeaconUsers beaconUsers = BeaconUsers.builder()
                                .user(userOpt.get())
                                .beacon(beaconOpt.get())
                                .build();
                        BeaconUsers save = beaconUsersRepository.save(beaconUsers);
                        beaconOpt.get().setBeaconTemperature(i.getTemperature());
                        beaconOpt.get().setBeaconMoisture(i.getHumidity());
                        beaconOpt.get().setBeaconBattery(i.getVbatt());
                        beaconRepository.save(beaconOpt.get());
                        ids.add(id);
                    }
                }
                else{
                    ret.status = false;
                    return new ResponseEntity<>(ret, HttpStatus.OK);
                }
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
