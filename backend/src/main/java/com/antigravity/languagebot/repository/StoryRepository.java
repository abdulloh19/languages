package com.antigravity.languagebot.repository;

import com.antigravity.languagebot.entity.Story;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoryRepository extends JpaRepository<Story, Long> {
    List<Story> findByLevelOrderByIdAsc(String level);
    List<Story> findAllByOrderByIdAsc();
}
