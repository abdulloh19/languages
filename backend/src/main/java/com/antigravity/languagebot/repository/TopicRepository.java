package com.antigravity.languagebot.repository;

import com.antigravity.languagebot.entity.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Long> {
    Optional<Topic> findByTopicKey(String topicKey);
    List<Topic> findAllByOrderByDisplayOrderAsc();
}
