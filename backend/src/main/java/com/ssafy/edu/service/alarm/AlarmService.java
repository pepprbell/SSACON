package com.ssafy.edu.service.alarm;

import com.ssafy.edu.model.Alarm.AlarmResponse;
import org.springframework.http.ResponseEntity;

public interface AlarmService {
    public ResponseEntity<AlarmResponse> getAlarmAll(String userId);
    public ResponseEntity<AlarmResponse> getAlarmOne(Long alarmId);
    public ResponseEntity<AlarmResponse> deleteAlarm(String userId, Long alarmId);
    public ResponseEntity<AlarmResponse> getAdminAlarm(String userId);
}
