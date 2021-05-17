package com.ssafy.edu.repository.line;


import com.ssafy.edu.model.line.Line;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LineRepository extends JpaRepository<Line, Long> {
    public Optional<Line> findByLineId(String id);
}
