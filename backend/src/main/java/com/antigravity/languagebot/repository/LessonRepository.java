package com.antigravity.languagebot.repository;

import com.antigravity.languagebot.entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {
    List<Lesson> findByLevelOrderByUnitNumberAscLessonOrderAsc(String level);
    List<Lesson> findAllByOrderByLevelAscLessonOrderAsc();
}
