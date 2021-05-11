package com.ssafy.edu.service.checksheet;

import com.ssafy.edu.model.beacon.Beacon;
import com.ssafy.edu.model.checksheet.*;
import com.ssafy.edu.model.user.User;
import com.ssafy.edu.repository.beacon.BeaconRepository;
import com.ssafy.edu.repository.checksheet.ChecksheetRepository;
import com.ssafy.edu.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ChecksheetServiceImpl implements ChecksheetService{
    @Autowired
    ChecksheetRepository checksheetRepository;

    @Autowired
    BeaconRepository beaconRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public ResponseEntity<ChecksheetResponse> sendChecksheet(ChecksheetRequest checksheet){
        ChecksheetResponse ret = new ChecksheetResponse();
        Optional<Beacon> beaconOpt = beaconRepository.findByBeaconId(checksheet.getBeaconId());
        if(beaconOpt.isPresent()) {
            Checksheet tmp = Checksheet.builder()
                    .beaconId(checksheet.getBeaconId())
                    .checkName(checksheet.getCheckName())
                    .equipmentName(checksheet.getEquipment())
                    .build();
            checksheetRepository.save(tmp);
            Check r = new Check();
            r.setBeaconName(beaconOpt.get().getBeaconName());
            ret.data = r;
            ret.status = true;
        }
        else{
            ret.status = false;
        }
        return new ResponseEntity<>(ret, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ChecksheetResponse> getChecksheet(){
        ChecksheetResponse ret = new ChecksheetResponse();
        List<Checksheet> checksheets = checksheetRepository.findAll();
        List<ChecksheetListResponse> tmp = new ArrayList<>();
        for(Checksheet i: checksheets){
            Optional<Beacon> tmpb = beaconRepository.findByBeaconId(i.getBeaconId());
            ChecksheetListResponse t = new ChecksheetListResponse();
            t.setCheckName(i.getCheckName());
            t.setMachine(i.getEquipmentName());
            t.setBeaconName(tmpb.get().getBeaconName());
            tmp.add(t);
        }
        ret.data = tmp;
        ret.status = true;
        return new ResponseEntity<>(ret, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ChecksheetResponse> getBeaconHere(String userId){
        ChecksheetResponse ret = new ChecksheetResponse();
        Optional<User> userOpt = userRepository.findByUserId(userId);
        return null;
    }
}
