package com.ssafy.edu.controller.monitoring;


import com.ssafy.edu.model.beacon.BeaconResponse;
import com.ssafy.edu.model.monitoring.MonitoringResponse;
import com.ssafy.edu.service.monitoring.MonitoringService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@ApiResponses(value = {@ApiResponse(code = 401, message = "Unauthorized", response = MonitoringResponse.class),
        @ApiResponse(code = 403, message = "Forbidden", response = MonitoringResponse.class),
        @ApiResponse(code = 404, message = "Not Found", response = MonitoringResponse.class),
        @ApiResponse(code = 500, message = "Failure", response = MonitoringResponse.class)})


@RestController
@RequestMapping("/monitoring")
public class monitoring {
    @Autowired
    MonitoringService monitoringService;

    @ApiOperation(value = "비콘 전체 목록 불러오기", notes = "")
    @GetMapping("/beacon")
    public ResponseEntity<MonitoringResponse> GetBeaconAll(){return monitoringService.getBeaconAll();}
}
