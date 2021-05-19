package com.ssafy.edu.model.equipment;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.edu.model.beacon.Beacon;
import com.ssafy.edu.model.line.Line;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Equipment {
    @Id
    private String equipmentId;

    private String equipmentName;

    private String lineId;
}
