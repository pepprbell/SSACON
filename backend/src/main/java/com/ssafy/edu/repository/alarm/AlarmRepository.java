package com.ssafy.edu.repository.alarm;


import com.ssafy.edu.model.Alarm.Alarm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface AlarmRepository extends JpaRepository<Alarm, Long> {
    public List<Alarm> findByUserIdOrderByTimeDesc(String id);
    public List<Alarm> findByUserId(String id);
    public Optional<Alarm> findById(Long id);
    public List<Alarm> findByTypeAndBeaconId(String type, String beaconId);
    public List<Alarm> findByTypeAndUserId(String type, String userId);
}
