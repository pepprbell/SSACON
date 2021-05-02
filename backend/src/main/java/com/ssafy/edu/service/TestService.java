package com.ssafy.edu.service;

import com.ssafy.edu.model.TestResponse;
import org.springframework.http.ResponseEntity;

public interface TestService {
    public ResponseEntity<TestResponse> getDate(String Date);
    public ResponseEntity<TestResponse> sendDate(Integer pk);
    public ResponseEntity<TestResponse> sendReturn();
}
