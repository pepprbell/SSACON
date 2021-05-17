package com.ssafy.edu.repository.educationusers;

import com.ssafy.edu.model.education.Education;
import com.ssafy.edu.model.education.EducationUser;
import com.ssafy.edu.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EducationUsersRepository extends JpaRepository<EducationUser, Long> {
    public Optional<EducationUser> findByUserAndEducation(User user, Education education);
}
