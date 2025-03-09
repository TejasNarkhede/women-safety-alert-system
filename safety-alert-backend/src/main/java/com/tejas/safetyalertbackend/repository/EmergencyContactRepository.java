package com.tejas.safetyalertbackend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.tejas.safetyalertbackend.entity.EmergencyContact;

@Repository
public interface EmergencyContactRepository extends JpaRepository<EmergencyContact, Long> {
    
    @Query("SELECT e FROM EmergencyContact e WHERE e.userPhoneNumber = :userPhoneNumber")
    List<EmergencyContact> findByUserPhoneNumber(String userPhoneNumber);
}
