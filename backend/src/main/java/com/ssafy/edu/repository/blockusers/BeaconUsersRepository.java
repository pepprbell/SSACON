package com.ssafy.edu.repository.blockusers;

import com.ssafy.edu.model.beacon.Beacon;
import com.ssafy.edu.model.beacon.BeaconUsers;
import com.ssafy.edu.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BeaconUsersRepository extends JpaRepository<BeaconUsers, String> {
//    public Optional<BeaconUsers> findByBeaconAndUser(User user, Beacon beacon);
    public List<BeaconUsers> findByBeacon(Beacon beacon);
    public List<BeaconUsers> findByUser(User user);
}
