package com.ssafy.edu.service.alarm;


import com.ssafy.edu.model.Alarm.Alarm;
import com.ssafy.edu.model.Alarm.AlarmResponse;
import com.ssafy.edu.model.Alarm.AlarmResultResponse;
import com.ssafy.edu.model.user.User;
import com.ssafy.edu.repository.alarm.AlarmRepository;
import com.ssafy.edu.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AlarmServiceImpl implements AlarmService{
    @Autowired
    AlarmRepository alarmRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public ResponseEntity<AlarmResponse> getAlarmAll(String userId){
        Locale.setDefault(Locale.KOREA);
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
        AlarmResponse ret = new AlarmResponse();
        List<Alarm> alarms = alarmRepository.findByUserIdOrderByTimeDesc(userId);
        List<AlarmResultResponse> alarmResult = new ArrayList<>();
        for(Alarm i: alarms){
            AlarmResultResponse tmp = new AlarmResultResponse();
            tmp.setId(i.getId());
            tmp.setType(i.getType());
            tmp.setLine(i.getLine());
            tmp.setEquipment(i.getEquipment());
            tmp.setWriter(i.getWriter());
            tmp.setDescription(i.getDescription());
            tmp.setTime(i.getTime());
            tmp.setProperBeaconId(i.getProperBeaconId());
            tmp.setSubmissionBeaconId(i.getSubmissionBeaconId());
            tmp.setMinProperHumidity(i.getMinProperHumidity());
            tmp.setMaxProperHumidity(i.getMaxProperHumidity());
            tmp.setMinProperTemperature(i.getMinProperTemperature());
            tmp.setMaxProperTemperature(i.getMaxProperTemperature());
            tmp.setNowHumidity(i.getNowHumidity());
            tmp.setNowTemperature(i.getNowTemperature());
            tmp.setSession(i.getSession());
            tmp.setBattery(i.getBattery());
            alarmResult.add(tmp);
        }
        ret.data = alarmResult;
        ret.status = true;
        return new ResponseEntity<>(ret, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<AlarmResponse> getAlarmOne(Long alarmId){
        AlarmResponse ret = new AlarmResponse();
        Locale.setDefault(Locale.KOREA);
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
        Optional<Alarm> alarm = alarmRepository.findById(alarmId);
        AlarmResultResponse tmp = new AlarmResultResponse();
        if(alarm.isPresent()){
            tmp.setId(alarm.get().getId());
            tmp.setType(alarm.get().getType());
            tmp.setLine(alarm.get().getLine());
            tmp.setEquipment(alarm.get().getEquipment());
            tmp.setWriter(alarm.get().getWriter());
            tmp.setDescription(alarm.get().getDescription());
            tmp.setTime(alarm.get().getTime());
            tmp.setProperBeaconId(alarm.get().getProperBeaconId());
            tmp.setSubmissionBeaconId(alarm.get().getSubmissionBeaconId());
            tmp.setMinProperHumidity(alarm.get().getMinProperHumidity());
            tmp.setMaxProperHumidity(alarm.get().getMaxProperHumidity());
            tmp.setMinProperTemperature(alarm.get().getMinProperTemperature());
            tmp.setMaxProperTemperature(alarm.get().getMaxProperTemperature());
            tmp.setNowHumidity(alarm.get().getNowHumidity());
            tmp.setNowTemperature(alarm.get().getNowTemperature());
            tmp.setSession(alarm.get().getSession());
            tmp.setBattery(alarm.get().getBattery());
            ret.data = tmp;
            ret.status = true;
        }
        else{
            ret.status = false;
        }
        return new ResponseEntity<>(ret, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<AlarmResponse> deleteAlarm(String userId, Long alarmId){
        AlarmResponse ret = new AlarmResponse();
        Optional<User> userOpt = userRepository.findByUserId(userId);
        Optional<Alarm> alarmOpt = alarmRepository.findById(alarmId);
        Locale.setDefault(Locale.KOREA);
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
        if(userOpt.isPresent() && alarmOpt.isPresent() && userOpt.get().getUserId() == alarmOpt.get().getUserId()){
            alarmRepository.delete(alarmOpt.get());
            ret.status = true;
        }
        else{
            ret.status = false;
        }
        return new ResponseEntity<>(ret, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<AlarmResponse> getAdminAlarm(String userId){
        AlarmResponse ret = new AlarmResponse();
        Locale.setDefault(Locale.KOREA);
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
        Optional<User> userOpt = userRepository.findByUserId(userId);
        if(userOpt.isPresent()){
            if(userOpt.get().isAdmin()){
                List<Alarm> alarms = alarmRepository.findByUserIdOrderByTimeDesc(userId);
                List<AlarmResultResponse> alarmResult = new ArrayList<>();
                for(Alarm i: alarms){
                    if(!i.isReceive()) {
                        i.setReceive(true);
                        alarmRepository.save(i);
                        AlarmResultResponse tmp = new AlarmResultResponse();
                        tmp.setId(i.getId());
                        tmp.setType(i.getType());
                        tmp.setLine(i.getLine());
                        tmp.setEquipment(i.getEquipment());
                        tmp.setWriter(i.getWriter());
                        tmp.setDescription(i.getDescription());
                        tmp.setTime(i.getTime());
                        tmp.setProperBeaconId(i.getProperBeaconId());
                        tmp.setSubmissionBeaconId(i.getSubmissionBeaconId());
                        tmp.setMinProperHumidity(i.getMinProperHumidity());
                        tmp.setMaxProperHumidity(i.getMaxProperHumidity());
                        tmp.setMinProperTemperature(i.getMinProperTemperature());
                        tmp.setMaxProperTemperature(i.getMaxProperTemperature());
                        tmp.setNowHumidity(i.getNowHumidity());
                        tmp.setNowTemperature(i.getNowTemperature());
                        tmp.setSession(i.getSession());
                        tmp.setBattery(i.getBattery());
                        alarmResult.add(tmp);
                    }
                }
                ret.data = alarmResult;
                ret.status = true;
                return new ResponseEntity<>(ret, HttpStatus.OK);
            }
            ret.status = false;
        }
        ret.status = false;
        return new ResponseEntity<>(ret, HttpStatus.OK);
    }
}
