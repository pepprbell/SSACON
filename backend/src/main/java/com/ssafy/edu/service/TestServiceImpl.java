package com.ssafy.edu.service;

import com.ssafy.edu.model.TestDate;
import com.ssafy.edu.model.TestResponse;
import com.ssafy.edu.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class TestServiceImpl implements TestService {

    @Autowired
    TestRepository testRepository;

    @Override
    public ResponseEntity<TestResponse> getDate(String date) {
        ResponseEntity response;
        TestResponse ret = new TestResponse();
        TestDate tmp = TestDate.builder()
                .date(date)
                .build();
        TestDate t = testRepository.save(tmp);

        ret.data = t.getId();
        ret.status = true;
        response = new ResponseEntity<>(ret, HttpStatus.OK);
        return response;
    }

    @Override
    public ResponseEntity<TestResponse> sendDate(Integer pk) {
        Optional<TestDate> tmp = testRepository.findById(pk);
        TestResponse ret = new TestResponse();
        if(tmp.isPresent()){
            ret.data = tmp;
            ret.status = true;
            return new ResponseEntity<>(ret, HttpStatus.OK);
        }
        ret.status = false;
        return new ResponseEntity<>(ret, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<TestResponse> sendReturn(){
        TestResponse ret = new TestResponse();
        ret.status = true;
        return new ResponseEntity<>(ret, HttpStatus.OK);
    }
}
