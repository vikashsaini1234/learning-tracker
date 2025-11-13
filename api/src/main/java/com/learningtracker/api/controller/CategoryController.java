package com.learningtracker.api.controller;

import com.learningtracker.api.dto.CategoryDto;
import com.learningtracker.api.mapper.CategoryMapper;
import com.learningtracker.api.model.Category;
import com.learningtracker.api.service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService svc;

    public CategoryController(CategoryService svc) { this.svc = svc; }

    @GetMapping
    public ResponseEntity<List<CategoryDto>> getAll(@RequestParam(value = "includeTopics", defaultValue = "false") boolean includeTopics) {
        List<Category> cats = svc.findAll();
        List<CategoryDto> dtos = cats.stream().map(c -> CategoryMapper.toDto(c, includeTopics)).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryDto> getById(@PathVariable Long id,
                                               @RequestParam(value = "includeTopics", defaultValue = "true") boolean includeTopics) {
        Category c = svc.findById(id);
        return ResponseEntity.ok(CategoryMapper.toDto(c, includeTopics));
    }

    @PostMapping
    public ResponseEntity<CategoryDto> create(@RequestBody CategoryDto dto) {
        Category saved = svc.create(CategoryMapper.fromDto(dto));
        return ResponseEntity.created(URI.create("/api/categories/" + saved.getId())).body(CategoryMapper.toDto(saved, false));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryDto> update(@PathVariable Long id, @RequestBody CategoryDto dto) {
        Category updated = svc.update(id, CategoryMapper.fromDto(dto));
        return ResponseEntity.ok(CategoryMapper.toDto(updated, false));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        svc.delete(id);
        return ResponseEntity.noContent().build();
    }
}
