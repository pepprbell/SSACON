package com.ssafy.edu.model.equipment;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.ssafy.edu.model.beacon.Beacon;
import com.ssafy.edu.model.line.Line;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "line_equipment")
public class LineEquipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "line_equipment_id")
    private Long id;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "line_id")
    private Line line;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "equipment_id")
    private Equipment equipment;

    private Beacon beacon;
}
