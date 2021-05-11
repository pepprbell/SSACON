package com.ssafy.edu.controller.message;


import com.ssafy.edu.model.message.MessageCreateForm;
import com.ssafy.edu.model.message.MessageResponse;
import com.ssafy.edu.service.message.MessageService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@ApiResponses(value = {@ApiResponse(code = 401, message = "Unauthorized", response = MessageResponse.class),
        @ApiResponse(code = 403, message = "Forbidden", response = MessageResponse.class),
        @ApiResponse(code = 404, message = "Not Found", response = MessageResponse.class),
        @ApiResponse(code = 500, message = "Failure", response = MessageResponse.class)})

@RestController
@RequestMapping("/message")
public class message {
    @Autowired
    MessageService messageService;

    @ApiOperation(value = "인수인계 등록", notes = "")
    @PostMapping("/")
    public ResponseEntity<MessageResponse> createMessage(@RequestBody MessageCreateForm messageCreateForm){
        return messageService.createMessage(messageCreateForm);
    }

    @ApiOperation(value = "현재 위치 연결된 비콘 조회", notes = "")
    @GetMapping("/beacon/{userId}")
    public ResponseEntity<MessageResponse> getMessageUser(@PathVariable("userId") String userId){
        return messageService.getMessageUser(userId);
    }
}
