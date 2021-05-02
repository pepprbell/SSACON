package com.ssafy.edu.controller;

import com.ssafy.edu.model.TestResponse;
import com.ssafy.edu.service.TestService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@ApiResponses(value = {@ApiResponse(code = 401, message = "Unauthorized", response = TestResponse.class),
        @ApiResponse(code = 403, message = "Forbidden", response = TestResponse.class),
        @ApiResponse(code = 404, message = "Not Found", response = TestResponse.class),
        @ApiResponse(code = 500, message = "Failure", response = TestResponse.class)})


@RestController
@RequestMapping("/test")
public class test {
    @Autowired
    TestService testService;

    @ApiOperation(value = "날짜 전송", notes = "")
    @PostMapping("/{date}")
    public ResponseEntity<TestResponse> GetDate(@PathVariable("date") String date) {
        return testService.getDate(date);
    }
    @ApiOperation(value = "pk값으로 특정 날짜값 불러오기", notes = "")
    @GetMapping("/{pk}")
    public ResponseEntity<TestResponse> SendDate(@PathVariable("pk") int pk) {
        return testService.sendDate(pk);
    }
    @ApiOperation(value = "test", notes = "")
    @GetMapping("/")
    public ResponseEntity<TestResponse> SendReturn(){return testService.sendReturn();}
}
