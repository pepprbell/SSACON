package com.ssafy.edu.model.user;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.edu.model.beacon.BeaconUsers;
import com.ssafy.edu.model.education.EducationUser;
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

    private boolean isLogin;

    private String partName;

    @JsonManagedReference
    @OneToMany(mappedBy = "user", cascade = {CascadeType.ALL})
    List<BeaconUsers> beacons = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "user", cascade = {CascadeType.ALL})
    List<EducationUser> educations = new ArrayList<>();
}
