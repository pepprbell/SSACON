package com.ssafy.edu.controller.checksheet;


import com.ssafy.edu.model.checksheet.Checksheet;
import com.ssafy.edu.model.checksheet.ChecksheetRequest;
import com.ssafy.edu.model.checksheet.ChecksheetResponse;
import com.ssafy.edu.service.checksheet.ChecksheetService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@ApiResponses(value = {@ApiResponse(code = 401, message = "Unauthorized", response = ChecksheetResponse.class),
        @ApiResponse(code = 403, message = "Forbidden", response = ChecksheetResponse.class),
        @ApiResponse(code = 404, message = "Not Found", response = ChecksheetResponse.class),
        @ApiResponse(code = 500, message = "Failure", response = ChecksheetResponse.class)})

@RestController
@RequestMapping("/checksheet")
public class checksheet {
    @Autowired
    ChecksheetService checksheetService;

    @ApiOperation(value = "체크시트 제출", notes = "")
    @PostMapping("/")
    public ResponseEntity<ChecksheetResponse> sendChecksheet(@RequestBody ChecksheetRequest checksheetRequest){
        return checksheetService.sendChecksheet(checksheetRequest);
    }

    @ApiOperation(value = "체크시트 불러오기", notes = "")
    @GetMapping("/")
    public ResponseEntity<ChecksheetResponse> getChecksheet(){
        return checksheetService.getChecksheet();
    }


}
