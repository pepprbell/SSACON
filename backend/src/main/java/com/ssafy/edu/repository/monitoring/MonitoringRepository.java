package com.ssafy.edu.repository.monitoring;


import com.ssafy.edu.model.beacon.Beacon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MonitoringRepository extends JpaRepository<Beacon, Long> {
    public List<Beacon> findAll();
}
