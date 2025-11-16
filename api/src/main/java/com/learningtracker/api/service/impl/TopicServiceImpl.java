package com.learningtracker.api.service.impl;

import com.learningtracker.api.exception.ResourceNotFoundException;
import com.learningtracker.api.model.Category;
import com.learningtracker.api.model.Status;
import com.learningtracker.api.model.Topic;
import com.learningtracker.api.repository.CategoryRepository;
import com.learningtracker.api.repository.TopicRepository;
import com.learningtracker.api.service.TopicService;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class TopicServiceImpl implements TopicService {

    private final TopicRepository topicRepository;
    private final CategoryRepository categoryRepository;
    private final com.learningtracker.api.service.CategoryService categoryService;

    public TopicServiceImpl(TopicRepository topicRepository, CategoryRepository categoryRepository, com.learningtracker.api.service.CategoryService categoryService) {
        this.topicRepository = topicRepository;
        this.categoryRepository = categoryRepository;
        this.categoryService = categoryService;
    }

    @Override
    public List<Topic> findAll() {
        return topicRepository.findAll();
    }

    @Override
    public Topic findById(Long id) {
        return topicRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Topic not found"));
    }

    @Override
    public List<Topic> findByCategoryId(Long categoryId) {
        return topicRepository.findByCategoryId(categoryId);
    }

    @Override
    public Topic createForCategory(Long categoryId, Topic t) {
        Category cat = categoryRepository.findById(categoryId).orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        t.setCategory(cat);
        if (t.getStatus() == null) t.setStatus(Status.NOT_STARTED);
        Topic saved = topicRepository.save(t);
        categoryService.recalculateProgress(categoryId);
        return saved;
    }

    @Override
    public Topic update(Long id, Topic updatedTopic) {
        Topic existing = topicRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Topic not found"));

        // Only update non-null fields
        if (updatedTopic.getName() != null && !updatedTopic.getName().isBlank()) {
            existing.setName(updatedTopic.getName());
        }
        if (updatedTopic.getStatus() != null) {
            existing.setStatus(updatedTopic.getStatus());
        }

        Topic saved = topicRepository.save(existing);

        // Update category progress after topic status change
        categoryService.recalculateProgress(saved.getCategory().getId());

        return saved;
    }

    @Override
    public void delete(Long id) {
        Topic existing = findById(id);
        Long categoryId = existing.getCategory().getId();
        topicRepository.delete(existing);
        categoryService.recalculateProgress(categoryId);
    }

    @Override
    public int importTopicsFromExcel(Long categoryId, MultipartFile file) throws Exception {
        Category cat = categoryRepository.findById(categoryId).orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        List<Topic> created = new ArrayList<>();
        try (InputStream is = file.getInputStream(); XSSFWorkbook wb = new XSSFWorkbook(is)) {
            Sheet sheet = wb.getSheetAt(0);
            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue; // skip header if present
                if (row.getPhysicalNumberOfCells() == 0) continue;
                String name = null;
                if (row.getCell(0) != null) {
                    row.getCell(0).setCellType(CellType.STRING);
                    name = row.getCell(0).getStringCellValue();
                }
                if (name == null || name.trim().isEmpty()) continue;
                Topic t = new Topic();
                t.setName(name.trim());
                t.setStatus(Status.NOT_STARTED);
                t.setCategory(cat);
                created.add(topicRepository.save(t));
            }
        }
        categoryService.recalculateProgress(categoryId);
        return created.size();
    }
}
