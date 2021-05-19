package com.ssafy.edu.repository.beacon;


import com.ssafy.edu.model.beacon.Beacon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BeaconRepository extends JpaRepository<Beacon, String> {
    public List<Beacon> findAll();
    public Optional<Beacon> findByBeaconId(String beaconid);
}
