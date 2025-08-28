package com.franto.microservices.groupe_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GroupeDto {
    private Long id;
    private String nomGroup;
    private String description;
}
