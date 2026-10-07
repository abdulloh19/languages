package com.antigravity.languagebot.repository;

import com.antigravity.languagebot.entity.TaskItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskItemRepository extends JpaRepository<TaskItem, Long> {
    List<TaskItem> findByLevelAndTaskTypeOrderByIdAsc(String level, String taskType);
    List<TaskItem> findByLevelOrderByIdAsc(String level);
    List<TaskItem> findByTaskTypeOrderByIdAsc(String taskType);
}
