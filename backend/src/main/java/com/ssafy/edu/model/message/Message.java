package com.ssafy.edu.model.message;


import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Message {
    @Id
    private Long id;

    private String beaconId;

    private String userId;

    private String content;
}
