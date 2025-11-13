package com.learningtracker.api.mapper;

import com.learningtracker.api.dto.CategoryDto;
import com.learningtracker.api.dto.TopicDto;
import com.learningtracker.api.model.Category;
import com.learningtracker.api.model.Topic;

import java.util.stream.Collectors;

public class CategoryMapper {

    public static CategoryDto toDto(Category c, boolean includeTopics) {
        if (c == null) return null;
        return CategoryDto.builder()
                .id(c.getId())
                .name(c.getName())
                .description(c.getDescription())
                .status(c.getStatus() == null ? null : c.getStatus().name())
                .progressPercent(c.getProgressPercent())
                .topics(includeTopics && c.getTopics() != null ?
                        c.getTopics().stream().map(CategoryMapper::topicToDto).collect(Collectors.toList()) :
                        null)
                .build();
    }

    private static TopicDto topicToDto(Topic t) {
        if (t == null) return null;
        return TopicDto.builder()
                .id(t.getId())
                .name(t.getName())
                .status(t.getStatus() == null ? null : t.getStatus().name())
                .categoryId(t.getCategory() != null ? t.getCategory().getId() : null)
                .categoryName(t.getCategory() != null ? t.getCategory().getName() : null)
                .build();
    }

    public static Category fromDto(CategoryDto dto) {
        if (dto == null) return null;
        Category c = new Category();
        c.setId(dto.getId());
        c.setName(dto.getName());
        c.setDescription(dto.getDescription());
        return c;
    }
}
