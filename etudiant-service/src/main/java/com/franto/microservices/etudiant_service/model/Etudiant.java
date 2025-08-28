package com.franto.microservices.etudiant_service.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;

@Document(value = "etudiant")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Etudiant {
    @Id
    private String id;
    private String matricule;
    private String nom;
    private String prenoms;
    private String sexe;
    private BigDecimal age;

}
