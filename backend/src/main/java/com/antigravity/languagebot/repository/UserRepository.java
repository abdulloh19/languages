package com.antigravity.languagebot.repository;

import com.antigravity.languagebot.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByTelegramId(Long telegramId);
    List<User> findByStatus(String status);
    long countByStatus(String status);

    @Query("SELECT u FROM User u ORDER BY (u.wordsLearnedRu + u.wordsLearnedEn + u.wordsLearnedUz) DESC")
    List<User> findTop10ByTotalWordsLearned();

    @Query("SELECT u FROM User u WHERE u.lastActiveAt < :cutoff AND u.status = 'INACTIVE'")
    List<User> findInactiveUsersForNudge(LocalDateTime cutoff);
}
