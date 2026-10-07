package com.antigravity.languagebot.repository;

import com.antigravity.languagebot.entity.DailyChecklist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface DailyChecklistRepository extends JpaRepository<DailyChecklist, Long> {
    Optional<DailyChecklist> findByUserIdAndChecklistDate(Long userId, LocalDate date);
}
