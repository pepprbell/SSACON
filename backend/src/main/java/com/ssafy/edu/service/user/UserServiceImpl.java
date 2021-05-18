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

import java.util.Locale;
import java.util.Optional;
import java.util.TimeZone;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    UserRepository userRepository;

    @Override
    public ResponseEntity<UserResponse> login(LoginRequest loginInfo){
        UserResponse ret = new UserResponse();
        LoginResponse re = new LoginResponse();
        Locale.setDefault(Locale.KOREA);
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));

        Optional<User> tmp = userRepository.findByUserId(loginInfo.getUserid());
        if(tmp.isPresent()){
            String tmppw = loginInfo.getPassword();
            String tmppw1 = tmp.get().getUserPassword();
            if(tmppw.equals(tmppw1)){
                re.setAdmin(tmp.get().isAdmin());
                re.setUserId(tmp.get().getUserId());
                tmp.get().setLogin(true);
                userRepository.save(tmp.get());
                ret.status = true;
                ret.data = re;
                return new ResponseEntity<>(ret, HttpStatus.OK);
            }
            else{
                ret.status = false;
                ret.data = re;
                return new ResponseEntity<>(ret, HttpStatus.BAD_REQUEST);
            }
        }
        else{
            ret.status = false;
            ret.data = re;
            return new ResponseEntity<>(ret, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<UserResponse> logout(String userId){
        UserResponse ret = new UserResponse();
        Locale.setDefault(Locale.KOREA);
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
        Optional<User> tmp = userRepository.findByUserId(userId);
        if(tmp.isPresent() && tmp.get().isLogin()){
            tmp.get().setLogin(false);
            userRepository.save(tmp.get());
            ret.status = true;
        }
        else{
            ret.status = false;
        }
        return new ResponseEntity<>(ret, HttpStatus.OK);
    }
}
