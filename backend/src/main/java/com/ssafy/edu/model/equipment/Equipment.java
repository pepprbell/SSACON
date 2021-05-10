package com.ssafy.edu.model.equipment;


import com.fasterxml.jackson.annotation.JsonManagedReference;
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
public class Equipment {
    @Id
    private String equipmentId;

    private String equipmentName;

    @JsonManagedReference
    @OneToMany(mappedBy = "equipment", cascade = {CascadeType.ALL})
    List<LineEquipment> lines = new ArrayList<>();
}
