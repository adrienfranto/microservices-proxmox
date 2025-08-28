package com.franto.microservices.travail_service.travail_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TravailDto {
    private Long id;
    private String titre;
    private String description;
}
