package com.ssafy.edu.model.line;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.edu.model.equipment.Equipment;
import lombok.*;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Line {
    @Id
    private String lineId;

    private String lineName;
}
