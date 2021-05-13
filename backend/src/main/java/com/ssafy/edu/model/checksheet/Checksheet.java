package com.ssafy.edu.model.checksheet;


import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Checksheet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "checksheet_id")
    private Long id;

    private String beaconId;

    private String equipmentName;

    private String checkName;
}
