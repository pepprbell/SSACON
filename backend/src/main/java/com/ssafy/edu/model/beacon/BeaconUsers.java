package com.ssafy.edu.model.beacon;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.ssafy.edu.model.user.User;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "beacon_user")
public class BeaconUsers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_beacon_id")
    private Long id;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "beacon_id")
    private Beacon beacon;
}
