package com.ssafy.edu.model.user;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.edu.model.beacon.Beacon;
import lombok.*;

import javax.persistence.*;

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

    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name="beaconId")
    private Beacon beacon;
}
