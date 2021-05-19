package com.ssafy.edu.service.user;

import com.ssafy.edu.model.user.LoginRequest;
import com.ssafy.edu.model.user.UserResponse;
import org.springframework.http.ResponseEntity;

public interface UserService {
    public ResponseEntity<UserResponse> login(LoginRequest loginInfo);
    public ResponseEntity<UserResponse> logout(String userId);
}
