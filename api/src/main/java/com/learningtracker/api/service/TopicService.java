package com.learningtracker.api.service;

import com.learningtracker.api.model.Topic;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface TopicService {
    List<Topic> findAll();
    Topic findById(Long id);
    List<Topic> findByCategoryId(Long categoryId);
    Topic createForCategory(Long categoryId, Topic t);
    Topic update(Long id, Topic t);
    void delete(Long id);
    int importTopicsFromExcel(Long categoryId, MultipartFile file) throws Exception;
}
