package com.ssafy.edu.repository.education;

import com.ssafy.edu.model.education.Education;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EducationRepository extends JpaRepository<Education, Long> {
//    public Optional<Education> findByEduId(Long id);
    public List<Education> findAll();
}
