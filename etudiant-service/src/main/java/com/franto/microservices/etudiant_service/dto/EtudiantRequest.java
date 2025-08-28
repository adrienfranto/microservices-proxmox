package com.franto.microservices.etudiant_service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EtudiantRequest {
    private String matricule;
    private String nom;
    private String prenoms;
    private String sexe;
    private BigDecimal age;
}
