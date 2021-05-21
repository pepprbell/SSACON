package com.ssafy.edu.repository.checksheet;

import com.ssafy.edu.model.checksheet.Checksheet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChecksheetRepository extends JpaRepository<Checksheet, Long> {
    public List<Checksheet> findAll();
}
