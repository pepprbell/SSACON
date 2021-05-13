package com.ssafy.edu.controller.alarm;


import com.ssafy.edu.model.Alarm.AlarmResponse;
import com.ssafy.edu.model.beacon.BeaconResponse;
import com.ssafy.edu.service.alarm.AlarmService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@ApiResponses(value = {@ApiResponse(code = 401, message = "Unauthorized", response = AlarmResponse.class),
        @ApiResponse(code = 403, message = "Forbidden", response = AlarmResponse.class),
        @ApiResponse(code = 404, message = "Not Found", response = AlarmResponse.class),
        @ApiResponse(code = 500, message = "Failure", response = AlarmResponse.class)})

@RestController
@RequestMapping("/alarm")
public class alarm {
    @Autowired
    AlarmService alarmService;

    @ApiOperation(value = "알람 전체 목록 불러오기", notes = "")
    @GetMapping("/{userId}")
    public ResponseEntity<AlarmResponse> getAlarmAll(@PathVariable("userId") String userId){
        return alarmService.getAlarmAll(userId);
    }

    @ApiOperation(value = "알람 1개 불러오기", notes = "")
    @GetMapping("one/{alarmId}")
    public ResponseEntity<AlarmResponse> getAlarmOne(@PathVariable("alarmId") Long alarmId){
        return alarmService.getAlarmOne(alarmId);
    }

    @ApiOperation(value = "알람 한개 삭제", notes = "")
    @DeleteMapping("/{userId}/{alarmId}")
    public ResponseEntity<AlarmResponse> deleteAlarm(@PathVariable("userId") String userId, @PathVariable("alarmId") Long alarmId){
        return alarmService.deleteAlarm(userId, alarmId);
    }

    @ApiOperation(value = "관리자 알람 확인", notes = "")
    @GetMapping("/admin/{userId}")
    public ResponseEntity<AlarmResponse> getAdminAlarm(@PathVariable("userId") String userId){
        return alarmService.getAdminAlarm(userId);
    }
}
