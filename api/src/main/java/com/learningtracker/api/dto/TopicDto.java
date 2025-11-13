package com.learningtracker.api.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TopicDto {
    private Long id;
    private String name;
    private String status;
    private Long categoryId;
    private String categoryName;
}
