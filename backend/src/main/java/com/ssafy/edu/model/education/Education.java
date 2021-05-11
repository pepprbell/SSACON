package com.ssafy.edu.model.education;


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
public class Education {
    @Id
    private Long eduId;

    private String eduName;

    private boolean onclass;

    private String session;

    @JsonManagedReference
    @OneToMany(mappedBy = "education", cascade = {CascadeType.ALL})
    List<EducationUser> users = new ArrayList<>();
}
