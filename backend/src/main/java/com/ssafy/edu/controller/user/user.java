package com.ssafy.edu.controller.user;

import com.ssafy.edu.model.user.LoginRequest;
import com.ssafy.edu.model.user.UserResponse;
import com.ssafy.edu.service.user.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@ApiResponses(value = {@ApiResponse(code = 401, message = "Unauthorized", response = UserResponse.class),
        @ApiResponse(code = 403, message = "Forbidden", response = UserResponse.class),
        @ApiResponse(code = 404, message = "Not Found", response = UserResponse.class),
        @ApiResponse(code = 500, message = "Failure", response = UserResponse.class)})


@RestController
@RequestMapping("/user")
public class user {
    @Autowired
    UserService userService;

    @ApiOperation(value = "로그인", notes = "")
    @PostMapping("/login")
    public ResponseEntity<UserResponse> Login(@ModelAttribute LoginRequest loginInfo){
        return userService.login(loginInfo);
    }

    @ApiOperation(value = "로그아웃", notes = "")
    @PostMapping("/logout/{userId}")
    public ResponseEntity<UserResponse> Logout(@PathVariable("userId") String userId){
        return userService.logout(userId);
    }
}
