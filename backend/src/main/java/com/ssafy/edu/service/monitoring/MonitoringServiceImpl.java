package com.ssafy.edu.service.monitoring;

import com.amazonaws.services.dynamodbv2.xspec.M;
import com.ssafy.edu.model.beacon.Beacon;
import com.ssafy.edu.model.beacon.BeaconUsers;
import com.ssafy.edu.model.monitoring.BeaconMonitoring;
import com.ssafy.edu.model.monitoring.MonitoringResponse;
import com.ssafy.edu.model.monitoring.WorkerMonitoring;
import com.ssafy.edu.model.user.User;
import com.ssafy.edu.repository.beacon.BeaconRepository;
import com.ssafy.edu.repository.beaconusers.BeaconUsersRepository;
import com.ssafy.edu.repository.user.UserRepository;
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

    @Autowired
    UserRepository userRepository;

    @Override
    public ResponseEntity<MonitoringResponse> getBeaconAll(){
        MonitoringResponse ret = new MonitoringResponse();
        List<Beacon> beacons = beaconRepository.findAll();
        List<BeaconMonitoring> finRet = new ArrayList<>();
        for(Beacon i: beacons){
            BeaconMonitoring tmp = new BeaconMonitoring();
            List<BeaconUsers> beaconUsers = beaconUsersRepository.findByBeacon(i);
            List<User> tmp1 = new ArrayList<>();
            List<User> tmp2 = new ArrayList<>();
            if(!beaconUsers.isEmpty()){
                for(BeaconUsers j: beaconUsers){
                    Date tmptime = j.getUser().getLastSignal();
                    Date timeNow = Date.from(Instant.now());
                    if(timeNow.getTime() - tmptime.getTime() < 300000){
                        tmp1.add(j.getUser());
                    }
                    else if(j.getUser().isLogin()){
                        tmp2.add(j.getUser());
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
            finRet.add(tmp);
        }
        ret.data = finRet;
        ret.status = true;
        return new ResponseEntity<>(ret, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<MonitoringResponse> getWorkerstatus(){
        MonitoringResponse ret = new MonitoringResponse();
        List<User> allusers = userRepository.findAll();
        WorkerMonitoring total = new WorkerMonitoring();

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

        total.setTotalLoginWorker(totalworker);
        total.setOnSignalWorker(onSignal);
        total.setNonSignalWorker(nonSignal);

        ret.data = total;
        ret.status = true;
        return new ResponseEntity<>(ret, HttpStatus.OK);
    }
}