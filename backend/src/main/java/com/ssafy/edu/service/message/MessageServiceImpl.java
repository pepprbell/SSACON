package com.ssafy.edu.service.message;


import com.ssafy.edu.model.Alarm.Alarm;
import com.ssafy.edu.model.beacon.Beacon;
import com.ssafy.edu.model.beacon.BeaconUsers;
import com.ssafy.edu.model.message.Message;
import com.ssafy.edu.model.message.MessageBeacon;
import com.ssafy.edu.model.message.MessageCreateForm;
import com.ssafy.edu.model.message.MessageResponse;
import com.ssafy.edu.model.user.User;
import com.ssafy.edu.repository.alarm.AlarmRepository;
import com.ssafy.edu.repository.beacon.BeaconRepository;
import com.ssafy.edu.repository.beaconusers.BeaconUsersRepository;
import com.ssafy.edu.repository.message.MessageRepository;
import com.ssafy.edu.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;

@Service
public class MessageServiceImpl implements MessageService{
    @Autowired
    UserRepository userRepository;

    @Autowired
    MessageRepository messageRepository;

    @Autowired
    AlarmRepository alarmRepository;

    @Autowired
    BeaconRepository beaconRepository;

    @Autowired
    BeaconUsersRepository beaconUsersRepository;

    @Override
    public ResponseEntity<MessageResponse> createMessage(MessageCreateForm messageCreateForm) {
        MessageResponse ret = new MessageResponse();
        Locale.setDefault(Locale.KOREA);
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
        Optional<Beacon> beaconOpt = beaconRepository.findByBeaconId(messageCreateForm.getBeaconId());
        Optional<User> userOpt = userRepository.findByUserId(messageCreateForm.getUserId());
        Date now = Date.from(Instant.now());

        List<User> admins = new ArrayList<>();
        List<User> all = userRepository.findAll();
        for(User i: all){
            if(i.isAdmin())
                admins.add(i);
        }

        if(beaconOpt.isPresent() && userOpt.isPresent()){
            Message nM = Message.builder()
                    .beaconId(messageCreateForm.getBeaconId())
                    .content(messageCreateForm.getMessage())
                    .userId(messageCreateForm.getUserId())
                    .receive(false)
                    .build();
            messageRepository.save(nM);

            for(User ad:admins) {
                Alarm malarm = Alarm.builder()
                        .type("takeover")
                        .line(beaconOpt.get().getLine())
                        .equipment(beaconOpt.get().getEquipment())
                        .writer(userOpt.get().getUserName())
                        .description(messageCreateForm.getMessage())
                        .time(now)
                        .userId(ad.getUserId())
                        .build();
                alarmRepository.save(malarm);
            }

            MessageCreateForm r = new MessageCreateForm();
            r.setMessage(nM.getContent());
            r.setBeaconId(nM.getBeaconId());
            r.setUserId(nM.getUserId());
            ret.data = r;
            ret.status = true;
        }
        else{
            ret.status = false;
        }
        return new ResponseEntity<>(ret, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<MessageResponse> getMessageUser(String userId){
        MessageResponse ret = new MessageResponse();
        Locale.setDefault(Locale.KOREA);
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
        Optional<User> userOpt = userRepository.findByUserId(userId);
        List<MessageBeacon> fin = new ArrayList<>();
        Date now = Date.from(Instant.now());
        if(userOpt.isPresent()) {
            List<BeaconUsers> beaconUsers = beaconUsersRepository.findByUser(userOpt.get());
            for(BeaconUsers i: beaconUsers){
                Beacon tmpbeacon = i.getBeacon();
                if(now.getTime() - userOpt.get().getLastSignal().getTime() < 120000) {
                    MessageBeacon tmpMb = new MessageBeacon();
                    tmpMb.setBeaconName(tmpbeacon.getBeaconName());
                    tmpMb.setBeaconId(tmpbeacon.getBeaconId());
                    tmpMb.setLastSignal(userOpt.get().getLastSignal());
                    fin.add(tmpMb);
                }
            }
            ret.data = fin;
            ret.status = true;
        }
        else{
            ret.status = false;
        }
        return new ResponseEntity<>(ret, HttpStatus.OK);
    }
}
