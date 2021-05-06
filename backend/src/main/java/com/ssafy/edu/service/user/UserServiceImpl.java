package com.ssafy.edu.service.user;


import com.ssafy.edu.model.user.LoginRequest;
import com.ssafy.edu.model.user.LoginResponse;
import com.ssafy.edu.model.user.User;
import com.ssafy.edu.model.user.UserResponse;
import com.ssafy.edu.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    UserRepository userRepository;

    @Override
    public ResponseEntity<UserResponse> login(LoginRequest loginInfo){
        UserResponse ret = new UserResponse();
        LoginResponse re = new LoginResponse();
        Optional<User> tmp = userRepository.findByUserId(loginInfo.getUserid());
        if(tmp.isPresent()){
            String tmppw = loginInfo.getPassword();
            String tmppw1 = tmp.get().getUserPassword();
            if(tmppw.equals(tmppw1)){
                re.setLogin(true);
                re.setUserId(tmp.get().getUserId());
                ret.status = true;
                ret.data = re;
                return new ResponseEntity<>(ret, HttpStatus.OK);
            }
            else{
                re.setLogin(false);
                ret.status = false;
                ret.data = re;
                return new ResponseEntity<>(ret, HttpStatus.BAD_REQUEST);
            }
        }
        else{
            re.setLogin(false);
            ret.status = false;
            ret.data = re;
            return new ResponseEntity<>(ret, HttpStatus.BAD_REQUEST);
        }
    }
}
