package com.ssafy.edu.model.beacon;


import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Beacon {
    @Id
    private String id;

    private String name;
}
