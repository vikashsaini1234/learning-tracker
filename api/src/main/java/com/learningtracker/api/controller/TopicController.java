package com.learningtracker.api.controller;

import com.learningtracker.api.dto.TopicDto;
import com.learningtracker.api.mapper.TopicMapper;
import com.learningtracker.api.model.Topic;
import com.learningtracker.api.service.TopicService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/topics")
public class TopicController {

    private final TopicService svc;

    public TopicController(TopicService svc) { this.svc = svc; }

    @GetMapping
    public ResponseEntity<List<TopicDto>> getAll() {
        List<Topic> t = svc.findAll();
        return ResponseEntity.ok(t.stream().map(TopicMapper::toDto).collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TopicDto> getById(@PathVariable Long id) {
        Topic t = svc.findById(id);
        return ResponseEntity.ok(TopicMapper.toDto(t));
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<TopicDto>> getByCategory(@PathVariable Long categoryId) {
        List<Topic> topics = svc.findByCategoryId(categoryId);
        return ResponseEntity.ok(topics.stream().map(TopicMapper::toDto).collect(Collectors.toList()));
    }

    @PostMapping("/category/{categoryId}")
    public ResponseEntity<TopicDto> createForCategory(@PathVariable Long categoryId, @RequestBody TopicDto dto) {
        Topic t = TopicMapper.fromDto(dto);
        Topic saved = svc.createForCategory(categoryId, t);
        return ResponseEntity.created(URI.create("/api/topics/" + saved.getId())).body(TopicMapper.toDto(saved));
    }

    @PostMapping("/import/{categoryId}")
    public ResponseEntity<?> importExcel(@PathVariable Long categoryId, @RequestParam("file") MultipartFile file) {
        try {
            int count = svc.importTopicsFromExcel(categoryId, file);
            return ResponseEntity.ok().body(java.util.Map.of("categoryId", categoryId, "topicsAdded", count));
        } catch (Exception e) {
            throw new RuntimeException("Failed to import topics: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<TopicDto> update(@PathVariable Long id, @RequestBody TopicDto dto) {
        Topic t = TopicMapper.fromDto(dto);
        if (dto.getStatus() != null) {
            t.setStatus(com.learningtracker.api.model.Status.valueOf(dto.getStatus()));
        }
        Topic updated = svc.update(id, t);
        return ResponseEntity.ok(TopicMapper.toDto(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        svc.delete(id);
        return ResponseEntity.noContent().build();
    }
}
