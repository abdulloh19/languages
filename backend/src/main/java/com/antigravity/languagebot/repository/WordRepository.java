package com.antigravity.languagebot.repository;

import com.antigravity.languagebot.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WordRepository extends JpaRepository<Word, Long> {
    Optional<Word> findByTopicIdAndWordOrder(Long topicId, int wordOrder);
    List<Word> findByTopicIdOrderByWordOrderAsc(Long topicId);
    List<Word> findByTopicIdAndWordOrderBetweenOrderByWordOrderAsc(Long topicId, int startOrder, int endOrder);
    List<Word> findTop20ByTopicIdOrderByWordOrderAsc(Long topicId);
}
