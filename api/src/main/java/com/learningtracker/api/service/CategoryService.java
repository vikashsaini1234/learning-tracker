package com.learningtracker.api.service;

import com.learningtracker.api.model.Category;

import java.util.List;

public interface CategoryService {
    List<Category> findAll();
    Category findById(Long id);
    Category create(Category c);
    Category update(Long id, Category c);
    void delete(Long id);
    void recalculateProgress(Long categoryId);
}
