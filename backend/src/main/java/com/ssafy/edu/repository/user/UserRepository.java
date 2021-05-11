package com.ssafy.edu.repository.user;


import com.ssafy.edu.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    public Optional<User> findByUserId(String userid);
    public List<User> findAll();
}
