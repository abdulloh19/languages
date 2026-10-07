package com.antigravity.languagebot.repository;

import com.antigravity.languagebot.entity.StudyPartner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudyPartnerRepository extends JpaRepository<StudyPartner, Long> {
    @Query("SELECT sp FROM StudyPartner sp WHERE (sp.user1Id = :userId OR sp.user2Id = :userId) AND sp.status = 'ACTIVE'")
    Optional<StudyPartner> findActivePartnerForUser(Long userId);
}
