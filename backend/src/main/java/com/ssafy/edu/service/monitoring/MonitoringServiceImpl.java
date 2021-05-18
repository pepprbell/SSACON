package com.ssafy.edu.service.monitoring;

import com.ssafy.edu.model.beacon.Beacon;
import com.ssafy.edu.model.beacon.BeaconUsers;
import com.ssafy.edu.model.monitoring.BeaconMonitoring;
import com.ssafy.edu.model.monitoring.MonitoringResponse;
import com.ssafy.edu.model.monitoring.MonitoringTotal;
import com.ssafy.edu.model.monitoring.MonitoringUser;
import com.ssafy.edu.model.user.User;
import com.ssafy.edu.repository.beacon.BeaconRepository;
import com.ssafy.edu.repository.beaconusers.BeaconUsersRepository;
import com.ssafy.edu.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;

@Service
public class MonitoringServiceImpl implements MonitoringService{
    @Autowired
    BeaconRepository beaconRepository;

    @Autowired
    BeaconUsersRepository beaconUsersRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public ResponseEntity<MonitoringResponse> getBeaconAll(){
        MonitoringResponse ret = new MonitoringResponse();
        List<Beacon> beacons = beaconRepository.findAll();
        List<BeaconMonitoring> finRet = new ArrayList<>();
        Locale.setDefault(Locale.KOREA);
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));

        MonitoringTotal fin = new MonitoringTotal();

        for(Beacon i: beacons){
            BeaconMonitoring tmp = new BeaconMonitoring();
            List<BeaconUsers> beaconUsers = beaconUsersRepository.findByBeacon(i);
            List<MonitoringUser> tmp1 = new ArrayList<>();
            List<MonitoringUser> tmp2 = new ArrayList<>();
            if(!beaconUsers.isEmpty()){
                for(BeaconUsers j: beaconUsers){
                    Date tmptime = j.getUser().getLastSignal();
                    Date timeNow = Date.from(Instant.now());
                    MonitoringUser tmpuser = new MonitoringUser();
                    tmpuser.setPartName(j.getUser().getPartName());
                    tmpuser.setLastSignal(j.getUser().getLastSignal());
                    tmpuser.setUserId(j.getUser().getUserId());
                    tmpuser.setUserName(j.getUser().getUserName());
                    if(j.getUser().isLogin()) {
                        if (timeNow.getTime() - tmptime.getTime() < 300000) {
                            tmp1.add(tmpuser);
                        } else{
                            tmp2.add(tmpuser);
                        }
                    }
                }
            }
            tmp.setBeaconId(i.getBeaconId());
            tmp.setBeaconName(i.getBeaconName());
            tmp.setBeaconMoisture(i.getBeaconMoisture());
            tmp.setBeaconTemperature(i.getBeaconTemperature());
            tmp.setBeaconBattery(i.getBeaconBattery());
            tmp.setConnectWorkers(tmp1);
            tmp.setNonConnectWorkers(tmp2);
            tmp.setXPos(i.getXPos());
            tmp.setYPos(i.getYPos());
            tmp.setEquipment(i.getEquipment());
            tmp.setLine(i.getLine());
            tmp.setTempMax(i.getTempMax());
            tmp.setTempMin(i.getTempMin());
            tmp.setHumiMax(i.getHumidtyMax());
            tmp.setHumiMin(i.getHumidtyMin());
            finRet.add(tmp);
        }

        List<User> allusers = userRepository.findAll();

        List<String> totalworker = new ArrayList<>();
        List<String> onSignal = new ArrayList<>();
        List<String> nonSignal = new ArrayList<>();

        Date now = Date.from(Instant.now());

        for(User u:allusers){
            if(u.isLogin()){
                totalworker.add(u.getUserId());
                if(u.getLastSignal() != null && now.getTime() - u.getLastSignal().getTime() < 300000){
                    onSignal.add(u.getUserId());
                }
                else{
                    nonSignal.add(u.getUserId());
                }
            }
        }

        fin.setBeacons(finRet);
        fin.setTotalLoginWorker(totalworker);
        fin.setOnSignalWorker(onSignal);
        fin.setNonSignalWorker(nonSignal);

        ret.data = fin;
        ret.status = true;
        return new ResponseEntity<>(ret, HttpStatus.OK);
    }
}
