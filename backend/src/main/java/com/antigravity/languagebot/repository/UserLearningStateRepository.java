package com.antigravity.languagebot.repository;

import com.antigravity.languagebot.entity.UserLearningState;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserLearningStateRepository extends JpaRepository<UserLearningState, Long> {
    Optional<UserLearningState> findByUserId(Long userId);
}
