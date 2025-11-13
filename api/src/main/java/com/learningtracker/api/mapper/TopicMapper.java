package com.learningtracker.api.mapper;

import com.learningtracker.api.dto.TopicDto;
import com.learningtracker.api.model.Topic;

public class TopicMapper {

    public static TopicDto toDto(Topic t) {
        if (t == null) return null;
        return TopicDto.builder()
                .id(t.getId())
                .name(t.getName())
                .status(t.getStatus() == null ? null : t.getStatus().name())
                .categoryId(t.getCategory() != null ? t.getCategory().getId() : null)
                .categoryName(t.getCategory() != null ? t.getCategory().getName() : null)
                .build();
    }

    public static Topic fromDto(TopicDto dto) {
        if (dto == null) return null;
        Topic t = new Topic();
        t.setId(dto.getId());
        t.setName(dto.getName());
        return t;
    }
}
