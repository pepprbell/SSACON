package com.ssafy.edu.model.user;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.edu.model.beacon.BeaconUsers;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class User {
    @Id
    private String userId;

    private String userName;

    private boolean isAdmin;

    private String userPassword;

    private Date lastSignal;

    @JsonManagedReference
    @OneToMany(mappedBy = "user", cascade = {CascadeType.ALL})
    List<BeaconUsers> beacons = new ArrayList<>();
}