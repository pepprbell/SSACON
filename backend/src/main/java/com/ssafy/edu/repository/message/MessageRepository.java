package com.ssafy.edu.repository.message;


import com.ssafy.edu.model.message.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    public List<Message> findByBeaconIdAndReceive(String id, boolean receive);
}
