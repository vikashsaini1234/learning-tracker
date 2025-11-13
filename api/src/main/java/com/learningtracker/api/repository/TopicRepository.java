package com.learningtracker.api.repository;

import com.learningtracker.api.model.Topic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TopicRepository extends JpaRepository<Topic, Long> {
    List<Topic> findByCategoryId(Long categoryId);
    long countByCategoryId(Long categoryId);
    long countByCategoryIdAndStatus(Long categoryId, com.learningtracker.api.model.Status status);
}
