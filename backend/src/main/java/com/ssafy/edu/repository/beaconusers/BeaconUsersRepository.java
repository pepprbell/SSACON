package com.ssafy.edu.repository.beaconusers;

import com.ssafy.edu.model.beacon.Beacon;
import com.ssafy.edu.model.beacon.BeaconUsers;
import com.ssafy.edu.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BeaconUsersRepository extends JpaRepository<BeaconUsers, Long> {
    public List<BeaconUsers> findByBeacon(Beacon beacon);
    public List<BeaconUsers> findByUser(User user);
}
