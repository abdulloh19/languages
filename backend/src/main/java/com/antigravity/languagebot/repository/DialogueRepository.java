package com.antigravity.languagebot.repository;

import com.antigravity.languagebot.entity.Dialogue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DialogueRepository extends JpaRepository<Dialogue, Long> {
    Optional<Dialogue> findByTopicIdAndDialogueOrder(Long topicId, int dialogueOrder);
    List<Dialogue> findByTopicIdOrderByDialogueOrderAsc(Long topicId);
}
