package com.ssafy.edu.service.beacon;


import com.ssafy.edu.model.Alarm.Alarm;
import com.ssafy.edu.model.Alarm.AlarmResultResponse;
import com.ssafy.edu.model.beacon.*;
import com.ssafy.edu.model.education.Education;
import com.ssafy.edu.model.education.EducationUser;
import com.ssafy.edu.model.equipment.Equipment;
import com.ssafy.edu.model.line.Line;
import com.ssafy.edu.model.line.LineInfo;
import com.ssafy.edu.model.message.Message;
import com.ssafy.edu.model.user.User;
import com.ssafy.edu.repository.alarm.AlarmRepository;
import com.ssafy.edu.repository.beacon.BeaconRepository;
import com.ssafy.edu.repository.beaconusers.BeaconUsersRepository;
import com.ssafy.edu.repository.education.EducationRepository;
import com.ssafy.edu.repository.educationusers.EducationUsersRepository;
import com.ssafy.edu.repository.equipment.EquipmentRepository;
import com.ssafy.edu.repository.line.LineRepository;
import com.ssafy.edu.repository.message.MessageRepository;
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

    @Autowired
    EducationUsersRepository educationUsersRepository;

    @Autowired
    EducationRepository educationRepository;

    @Autowired
    AlarmRepository alarmRepository;

    @Autowired
    MessageRepository messageRepository;

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

        List<AlarmResultResponse> scanRet = new ArrayList<>();

        Optional<User> userOpt = userRepository.findByUserId(userid);
        if(userOpt.isPresent()) {
            Date now = Date.from(Instant.now());
            userOpt.get().setLastSignal(now);
            userRepository.save(userOpt.get());
            List<BeaconUsers> beaconUsersOptU = beaconUsersRepository.findByUser(userOpt.get());
            if(!beaconUsersOptU.isEmpty()) {
                for (BeaconUsers i : beaconUsersOptU) {
                    beaconUsersRepository.delete(i);
                }
            }
            String educationBeacon = "edu";
            List<String> tmpset = new ArrayList<>();
            Collections.reverse(beaconScanList);
            List<Education> edus = educationRepository.findAll();
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

                        // 교육장 출석
                        if(beaconOpt.get().getBeaconId().equals(educationBeacon)){
                            for(Education e:edus){
                                if(e.isOnclass()){
                                    Optional<EducationUser> tmpAttendence = educationUsersRepository.findByUserAndEducation(userOpt.get(), e);
                                    if(tmpAttendence.isEmpty()){
                                        EducationUser curAttendence = EducationUser.builder()
                                                .education(e)
                                                .user(userOpt.get())
                                                .build();
                                        educationUsersRepository.save(curAttendence);
                                        Alarm tmpAttend = Alarm.builder()
                                                .type("attendance")
                                                .line(beaconOpt.get().getLine())
                                                .session(e.getSession())
                                                .time(now)
                                                .build();
                                        Alarm l = alarmRepository.save(tmpAttend);
                                        AlarmResultResponse k = new AlarmResultResponse();
                                        k.setId(l.getId());
                                        k.setType(l.getType());
                                        k.setLine(l.getLine());
                                        k.setSession(l.getSession());
                                        k.setTime(now);
                                        scanRet.add(k);
                                    }
                                }
                            }
                        }

                        // 경고
                        Beacon wBeacon = beaconOpt.get();
                        List<Alarm> beaconAlarm = alarmRepository.findByTypeAndBeaconId("warning", wBeacon.getBeaconId());
                        Alarm last = beaconAlarm.get(beaconAlarm.size() - 1);
                        List<User> allusers = userRepository.findAll();
                        List<User> admins = new ArrayList<>();
                        for(User tmpu: allusers){
                            if(tmpu.isAdmin()){
                                admins.add(tmpu);
                            }
                        }
                        if((i.getHumidity() < wBeacon.getHumidtyMin() || i.getHumidity() > wBeacon.getHumidtyMax())
                                || (i.getTemperature() < wBeacon.getTempMax() || i.getTemperature() > wBeacon.getTempMax())) {
                            if (now.getTime() - last.getTime().getTime() < 600000){
                                Alarm w = Alarm.builder()
                                        .type("warning")
                                        .line(wBeacon.getLine())
                                        .equipment(wBeacon.getEquipment())
                                        .minProperHumidity(wBeacon.getHumidtyMin())
                                        .maxProperHumidity(wBeacon.getHumidtyMax())
                                        .minProperTemperature(wBeacon.getTempMin())
                                        .maxProperTemperature(wBeacon.getTempMax())
                                        .nowHumidity(wBeacon.getBeaconMoisture())
                                        .nowTemperature(wBeacon.getBeaconTemperature())
                                        .time(now)
                                        .userId(userOpt.get().getUserId())
                                        .beaconId(wBeacon.getBeaconId())
                                        .build();
                                Alarm tmpw = alarmRepository.save(w);
                                for (User admin : admins) {
                                    Alarm wadmin = Alarm.builder()
                                            .type("warning")
                                            .line(wBeacon.getLine())
                                            .equipment(wBeacon.getEquipment())
                                            .minProperHumidity(wBeacon.getHumidtyMin())
                                            .maxProperHumidity(wBeacon.getHumidtyMax())
                                            .minProperTemperature(wBeacon.getTempMin())
                                            .maxProperTemperature(wBeacon.getTempMax())
                                            .nowHumidity(wBeacon.getBeaconMoisture())
                                            .nowTemperature(wBeacon.getBeaconTemperature())
                                            .time(now)
                                            .userId(admin.getUserId())
                                            .beaconId(wBeacon.getBeaconId())
                                            .receive(false)
                                            .build();
                                    alarmRepository.save(wadmin);
                                }
                                AlarmResultResponse aw = new AlarmResultResponse();
                                aw.setId(tmpw.getId());
                                aw.setType(tmpw.getType());
                                aw.setLine(tmpw.getLine());
                                aw.setEquipment(tmpw.getEquipment());
                                aw.setMinProperHumidity(tmpw.getMinProperHumidity());
                                aw.setMaxProperHumidity(tmpw.getMaxProperHumidity());
                                aw.setMinProperTemperature(tmpw.getMinProperTemperature());
                                aw.setMaxProperTemperature(tmpw.getMaxProperTemperature());
                                aw.setNowHumidity(tmpw.getNowHumidity());
                                aw.setNowTemperature(tmpw.getNowTemperature());
                                aw.setTime(now);
                                scanRet.add(aw);
                            }
                        }


                        //배터리








                    }
                }
                else{
                    ret.status = false;
                    return new ResponseEntity<>(ret, HttpStatus.OK);
                }
            }
            ret.data = scanRet;
            ret.status = true;
        }
        else{
            ret.status = false;
        }
        return new ResponseEntity<>(ret, HttpStatus.OK);
    }

}
