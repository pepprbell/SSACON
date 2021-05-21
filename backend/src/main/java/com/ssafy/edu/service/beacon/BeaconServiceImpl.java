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
        Locale.setDefault(Locale.KOREA);
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
        List<Beacon> beacons = beaconRepository.findAll();
        BeaconList beaconList = new BeaconList();
        LineInfo lines = new LineInfo();
        List<String> beaconMonitorResponses = new ArrayList<>();
        List<String> l1 = new ArrayList<>();
        List<String> l2 = new ArrayList<>();

        List<BeaconInfoResponse> beaconInfoResponses = new ArrayList<>();
        for(Beacon i:beacons){
            String tmp = i.getBeaconId();
            beaconMonitorResponses.add(tmp);
            BeaconInfoResponse tb = new BeaconInfoResponse();
            tb.setBeacon_id(i.getBeaconId());
            tb.setLine(i.getLine());
            tb.setEquipment(i.getEquipment());
            tb.setTemperatureMax(i.getTempMax());
            tb.setTemperatureMin(i.getTempMin());
            tb.setHumidityMax(i.getHumidtyMax());
            tb.setHumidityMin(i.getHumidtyMin());
            tb.setSignalPower(i.getSignalPower());
            tb.setSensing(i.getSensing());
            beaconInfoResponses.add(tb);
        }
        List<Equipment> allequips = equipmentRepository.findAll();
        for(Equipment i: allequips){
            String tmp = i.getLineId();
            Optional<Line> line = lineRepository.findByLineId(tmp);
            if(line.get().getLineName().equals("line1")){
                l1.add(i.getEquipmentName());
            }
            else if(line.get().getLineName().equals("line2")){
                l2.add(i.getEquipmentName());
            }
        }
        lines.setL101(l1);
        lines.setL102(l2);
        beaconList.setBeacon_id(beaconMonitorResponses);
        beaconList.setLine_equipment(lines);
        beaconList.setBeacon_info(beaconInfoResponses);
        ret.data = beaconList;
        ret.status = true;
        return new ResponseEntity<>(ret, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<BeaconResponse> createBeacon(String id, BeaconCreateRequest beaconCreateRequest) {
        BeaconResponse ret = new BeaconResponse();
        Locale.setDefault(Locale.KOREA);
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
        Beacon tmp = Beacon.builder()
                .beaconId(id)
                .line(beaconCreateRequest.getLine())
                .equipment(beaconCreateRequest.getEquipment())
                .beaconName(beaconCreateRequest.getLine() + "-" + beaconCreateRequest.getEquipment())
                .tempMax(beaconCreateRequest.getTemperatureMax())
                .tempMin(beaconCreateRequest.getTemperatureMin())
                .humidtyMax(beaconCreateRequest.getHumidityMax())
                .humidtyMin(beaconCreateRequest.getHumidityMin())
                .beaconMoisture((beaconCreateRequest.getHumidityMin()+beaconCreateRequest.getHumidityMax())/2)
                .beaconTemperature((beaconCreateRequest.getTemperatureMax()+beaconCreateRequest.getTemperatureMin())/2)
                .beaconBattery(100)
                .sensing(beaconCreateRequest.getSensing())
                .signalPower(beaconCreateRequest.getSignalPower())
                .build();
        Beacon t = beaconRepository.save(tmp);
        ret.data = t.getBeaconId();
        ret.status = true;
        return new ResponseEntity<>(ret, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<BeaconResponse> updateBeacon(String id, BeaconCreateRequest beaconCreateRequest) {
        BeaconResponse ret = new BeaconResponse();
        Locale.setDefault(Locale.KOREA);
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
        Optional<Beacon> beaconOpt = beaconRepository.findByBeaconId(id);
        if(beaconOpt.isPresent()) {
            beaconOpt.get().setLine(beaconCreateRequest.getLine());
            beaconOpt.get().setEquipment(beaconCreateRequest.getEquipment());
            beaconOpt.get().setBeaconName(beaconCreateRequest.getLine() + "-" + beaconCreateRequest.getEquipment());
            beaconOpt.get().setTempMax(beaconCreateRequest.getTemperatureMax());
            beaconOpt.get().setTempMin(beaconCreateRequest.getTemperatureMin());
            beaconOpt.get().setHumidtyMax(beaconCreateRequest.getHumidityMax());
            beaconOpt.get().setHumidtyMin(beaconCreateRequest.getHumidityMin());
            beaconOpt.get().setSensing(beaconCreateRequest.getSensing());
            beaconOpt.get().setSignalPower(beaconCreateRequest.getSignalPower());
            beaconRepository.save(beaconOpt.get());
            ret.status = true;
            ret.data = beaconOpt.get().getBeaconId();
        }
        else{
            ret.status = false;
        }
        return new ResponseEntity<>(ret, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<BeaconResponse> scanBeacons(List<BeaconContent> beaconScanList, String userid){
        BeaconResponse ret = new BeaconResponse();

        List<AlarmResultResponse> scanRet = new ArrayList<>();
        Locale.setDefault(Locale.KOREA);
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));

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
            String educationBeacon = "E3:2F:4B:F3:F2:77";
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
                                                .userId(userOpt.get().getUserId())
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

                        // 경고 & 배터리
                        Beacon wBeacon = beaconOpt.get();
                        List<User> allusers = userRepository.findAll();
                        List<User> admins = new ArrayList<>();
                        for (User tmpu : allusers) {
                            if (tmpu.isAdmin()) {
                                admins.add(tmpu);
                            }
                        }
                        List<Alarm> beaconAlarm = alarmRepository.findByTypeAndBeaconId("warning", wBeacon.getBeaconId());
                        if(!beaconAlarm.isEmpty()) {
                            Alarm last = beaconAlarm.get(beaconAlarm.size() - 1);
                            if ( i.getHumidity() < wBeacon.getHumidtyMin() || i.getHumidity() > wBeacon.getHumidtyMax()
                                    || i.getTemperature() < wBeacon.getTempMin() || i.getTemperature() > wBeacon.getTempMax() ) {

                                if (now.getTime() - last.getTime().getTime() > 600000) {
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
                                        if(admin.equals(userOpt.get())){
                                            continue;
                                        }
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
                        }
                        else{
                            if (i.getHumidity() < wBeacon.getHumidtyMin() || i.getHumidity() > wBeacon.getHumidtyMax()
                                    || i.getTemperature() < wBeacon.getTempMin() || i.getTemperature() > wBeacon.getTempMax()) {
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
                                    if(admin.equals(userOpt.get())){
                                        continue;
                                    }
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
                        List<Alarm> beaconB = alarmRepository.findByTypeAndBeaconId("battery", wBeacon.getBeaconId());
                        if(!beaconB.isEmpty()) {
                            Alarm lastB = beaconB.get(beaconB.size() - 1);
                            if (wBeacon.getBeaconBattery() < 5.0) {
                                if (now.getTime() - lastB.getTime().getTime() > 3600000) {
                                    Alarm B = Alarm.builder()
                                            .type("battery")
                                            .line(wBeacon.getLine())
                                            .beaconId(wBeacon.getBeaconId())
                                            .equipment(wBeacon.getEquipment())
                                            .battery(wBeacon.getBeaconBattery())
                                            .time(now)
                                            .userId(userOpt.get().getUserId())
                                            .build();
                                    Alarm tmpB = alarmRepository.save(B);
                                    for (User admin : admins) {
                                        if(admin.equals(userOpt.get())){
                                            continue;
                                        }
                                        Alarm adminB = Alarm.builder()
                                                .type("battery")
                                                .line(wBeacon.getLine())
                                                .beaconId(wBeacon.getBeaconId())
                                                .equipment(wBeacon.getEquipment())
                                                .battery(wBeacon.getBeaconBattery())
                                                .time(now)
                                                .userId(admin.getUserId())
                                                .build();
                                        alarmRepository.save(adminB);
                                    }
                                    AlarmResultResponse ab = new AlarmResultResponse();
                                    ab.setId(tmpB.getId());
                                    ab.setType(tmpB.getType());
                                    ab.setLine(tmpB.getLine());
                                    ab.setBeaconId(tmpB.getBeaconId());
                                    ab.setEquipment(tmpB.getEquipment());
                                    ab.setBattery(tmpB.getBattery());
                                    ab.setTime(tmpB.getTime());
                                    scanRet.add(ab);
                                }
                            }
                        }
                        else{
                            if (wBeacon.getBeaconBattery() < 5.0) {
                                Alarm B = Alarm.builder()
                                        .type("battery")
                                        .line(wBeacon.getLine())
                                        .beaconId(wBeacon.getBeaconId())
                                        .equipment(wBeacon.getEquipment())
                                        .battery(wBeacon.getBeaconBattery())
                                        .time(now)
                                        .userId(userOpt.get().getUserId())
                                        .build();
                                Alarm tmpB = alarmRepository.save(B);
                                for (User admin : admins) {
                                    if(admin.equals(userOpt.get())){
                                        continue;
                                    }
                                    Alarm adminB = Alarm.builder()
                                            .type("battery")
                                            .line(wBeacon.getLine())
                                            .beaconId(wBeacon.getBeaconId())
                                            .equipment(wBeacon.getEquipment())
                                            .battery(wBeacon.getBeaconBattery())
                                            .time(now)
                                            .userId(admin.getUserId())
                                            .build();
                                    alarmRepository.save(adminB);
                                }
                                AlarmResultResponse ab = new AlarmResultResponse();
                                ab.setId(tmpB.getId());
                                ab.setType(tmpB.getType());
                                ab.setLine(tmpB.getLine());
                                ab.setBeaconId(tmpB.getBeaconId());
                                ab.setEquipment(tmpB.getEquipment());
                                ab.setBattery(tmpB.getBattery());
                                ab.setTime(tmpB.getTime());
                                scanRet.add(ab);
                            }
                        }

                        // 인수인계
                        List<Message> messageList = messageRepository.findByBeaconIdAndReceive(wBeacon.getBeaconId(), false);
                        for(Message message: messageList){
                            if(!userOpt.get().getUserId().equals(message.getUserId())){
                                message.setReceive(true);
                                messageRepository.save(message);
                                Optional<User> writer = userRepository.findByUserId(message.getUserId());
                                Alarm am = Alarm.builder()
                                        .type("takeover")
                                        .line(wBeacon.getLine())
                                        .equipment(wBeacon.getEquipment())
                                        .writer(writer.get().getUserName())
                                        .description(message.getContent())
                                        .userId(userOpt.get().getUserId())
                                        .time(now)
                                        .build();
                                Alarm tmpm = alarmRepository.save(am);
                                AlarmResultResponse tmpam = new AlarmResultResponse();
                                tmpam.setId(tmpm.getId());
                                tmpam.setType(tmpm.getType());
                                tmpam.setLine(tmpm.getLine());
                                tmpam.setEquipment(tmpm.getEquipment());
                                tmpam.setWriter(tmpm.getWriter());
                                tmpam.setDescription(tmpm.getDescription());
                                tmpam.setTime(tmpm.getTime());
                                scanRet.add(tmpam);
                            }
                        }

                        // 체크리스트 제출 알림
                        List<Alarm> checksheets = alarmRepository.findByTypeAndUserId("checksheet", userOpt.get().getUserId());
                        for(Alarm ac: checksheets){
                            if(!ac.isReceive()){
                                ac.setReceive(true);
                                alarmRepository.save(ac);
                                AlarmResultResponse tmpc = new AlarmResultResponse();
                                tmpc.setId(ac.getId());
                                tmpc.setType(ac.getType());
                                tmpc.setLine(ac.getLine());
                                tmpc.setEquipment(ac.getEquipment());
                                tmpc.setProperBeaconId(ac.getProperBeaconId());
                                tmpc.setSubmissionBeaconId(ac.getSubmissionBeaconId());
                                tmpc.setTime(ac.getTime());
                                scanRet.add(tmpc);
                            }
                        }
                    }
                }
                else{
                    ret.status = false;
                    return new ResponseEntity<>(ret, HttpStatus.OK);
                }
            }
            //24시간이 지나면 알림 자동 삭제
            List<Alarm> userAlarms = alarmRepository.findByUserId(userOpt.get().getUserId());
            for(Alarm a:userAlarms){
                if(now.getTime() - a.getTime().getTime() > 86400000){
                    alarmRepository.delete(a);
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


    @Override
    public ResponseEntity<BeaconResponse> deleteBeacon(String beaconId){
        BeaconResponse ret = new BeaconResponse();
        Locale.setDefault(Locale.KOREA);
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
        Optional<Beacon> beaconOpt = beaconRepository.findByBeaconId(beaconId);
        if(beaconOpt.isPresent()){
            beaconRepository.delete(beaconOpt.get());

            List<Beacon> beacons = beaconRepository.findAll();
            BeaconDeleteResponse beaconList = new BeaconDeleteResponse();
            List<BeaconInfoResponse> beaconInfoResponses = new ArrayList<>();
            List<String> beaconIds = new ArrayList<>();
            for(Beacon i:beacons){
                String tmp = i.getBeaconId();
                beaconIds.add(tmp);
                BeaconInfoResponse tb = new BeaconInfoResponse();
                tb.setBeacon_id(i.getBeaconId());
                tb.setLine(i.getLine());
                tb.setEquipment(i.getEquipment());
                tb.setTemperatureMax(i.getTempMax());
                tb.setTemperatureMin(i.getTempMin());
                tb.setHumidityMax(i.getHumidtyMax());
                tb.setHumidityMin(i.getHumidtyMin());
                tb.setSignalPower(i.getSignalPower());
                tb.setSensing(i.getSensing());
                beaconInfoResponses.add(tb);
            }

            beaconList.setBeacon_id(beaconIds);
            beaconList.setBeacon_info(beaconInfoResponses);
            ret.data = beaconList;
            ret.status = true;
        }
        else{
            ret.status = false;
        }
        return new ResponseEntity<>(ret, HttpStatus.OK);
    }

}
