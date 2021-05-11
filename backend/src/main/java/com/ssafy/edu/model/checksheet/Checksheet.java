package com.ssafy.edu.model.checksheet;


import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Checksheet {
    @Id
    private Long id;

    private String beaconId;

    private String equipmentName;

    private String checkName;
}
