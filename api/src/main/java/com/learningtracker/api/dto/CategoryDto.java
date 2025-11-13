package com.learningtracker.api.dto;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryDto {
    private Long id;
    private String name;
    private String description;
    private String status;
    private Double progressPercent;
    private List<TopicDto> topics;
}
