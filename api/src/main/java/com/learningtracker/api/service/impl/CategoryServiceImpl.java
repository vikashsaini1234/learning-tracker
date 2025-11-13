package com.learningtracker.api.service.impl;

import com.learningtracker.api.exception.ResourceNotFoundException;
import com.learningtracker.api.model.Category;
import com.learningtracker.api.model.Status;
import com.learningtracker.api.repository.CategoryRepository;
import com.learningtracker.api.repository.TopicRepository;
import com.learningtracker.api.service.CategoryService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final TopicRepository topicRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository, TopicRepository topicRepository) {
        this.categoryRepository = categoryRepository;
        this.topicRepository = topicRepository;
    }

    @Override
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Category findById(Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category not found"));
    }

    @Override
    public Category create(Category c) {
        if (c.getStatus() == null) c.setStatus(Status.NOT_STARTED);
        c.setProgressPercent(0.0);
        return categoryRepository.save(c);
    }

    @Override
    public Category update(Long id, Category c) {
        Category existing = findById(id);
        existing.setName(c.getName());
        existing.setDescription(c.getDescription());
        return categoryRepository.save(existing);
    }

    @Override
    public void delete(Long id) {
        Category existing = findById(id);
        categoryRepository.delete(existing);
    }

    @Override
    @Transactional
    public void recalculateProgress(Long categoryId) {
        Category cat = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        long total = topicRepository.countByCategoryId(categoryId);
        if (total == 0) {
            cat.setProgressPercent(0.0);
            cat.setStatus(Status.NOT_STARTED);
            categoryRepository.save(cat);
            return;
        }

        long completed = topicRepository.countByCategoryIdAndStatus(categoryId, Status.COMPLETED);
        long inProgress = topicRepository.countByCategoryIdAndStatus(categoryId, Status.IN_PROGRESS);

        double percent = ((double) completed / (double) total) * 100.0;
        cat.setProgressPercent(Math.round(percent * 100.0) / 100.0);

        // 🧠 Corrected logic
        if (completed == total) {
            cat.setStatus(Status.COMPLETED);
        } else if (completed == 0 && inProgress == 0) {
            cat.setStatus(Status.NOT_STARTED);
        } else {
            cat.setStatus(Status.IN_PROGRESS);
        }

        categoryRepository.save(cat);
    }

}
