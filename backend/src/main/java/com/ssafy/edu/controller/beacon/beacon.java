package com.ssafy.edu.controller.beacon;


import com.ssafy.edu.model.beacon.BeaconContent;
import com.ssafy.edu.model.beacon.BeaconCreateRequest;
import com.ssafy.edu.model.beacon.BeaconResponse;
import com.ssafy.edu.service.beacon.BeaconService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@ApiResponses(value = {@ApiResponse(code = 401, message = "Unauthorized", response = BeaconResponse.class),
        @ApiResponse(code = 403, message = "Forbidden", response = BeaconResponse.class),
        @ApiResponse(code = 404, message = "Not Found", response = BeaconResponse.class),
        @ApiResponse(code = 500, message = "Failure", response = BeaconResponse.class)})


@RestController
@RequestMapping("/beacon")
public class beacon {
    @Autowired
    BeaconService beaconService;

    @ApiOperation(value = "비콘 전체 목록 불러오기", notes = "")
    @GetMapping("/list")
    public ResponseEntity<BeaconResponse> GetBeaconAll(){
        return beaconService.getBeaconAll();
    }

    @ApiOperation(value = "비콘 추가", notes = "")
    @PostMapping("/add/{beacon_id}")
    public ResponseEntity<BeaconResponse> CreateBeacon(@PathVariable("beacon_id") String beacon_id, @RequestBody BeaconCreateRequest beaconCreateRequest){
        return beaconService.createBeacon(beacon_id, beaconCreateRequest);
    }

    @ApiOperation(value = "현재 스캔된 비콘 정보", notes = "")
    @PostMapping("/scanInfo/{userid}")
    public ResponseEntity<BeaconResponse> ScanBeacon(@PathVariable("userid") String userid,@RequestBody List<BeaconContent> beaconScanList){
        return beaconService.scanBeacons(beaconScanList, userid);
    }

    @ApiOperation(value = "비콘 수정", notes = "")
    @PostMapping("/update/{beacon_id}")
    public ResponseEntity<BeaconResponse> UpdateBeacon(@PathVariable("beacon_id") String beacon_id, @RequestBody BeaconCreateRequest beaconCreateRequest){
        return beaconService.updateBeacon(beacon_id, beaconCreateRequest);
    }

    @ApiOperation(value = "비콘 삭제", notes = "")
    @DeleteMapping("/delete/{beaconId}")
    public ResponseEntity<BeaconResponse> DeleteBeacon(@PathVariable("beaconId") String beaconId){
        return beaconService.deleteBeacon(beaconId);
    }
}
