package com.ssafy.edu.repository.equipment;


import com.ssafy.edu.model.equipment.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EquipmentRepository extends JpaRepository<Equipment, String> {
    public Optional<Equipment> findByEquipmentId(String id);
}
