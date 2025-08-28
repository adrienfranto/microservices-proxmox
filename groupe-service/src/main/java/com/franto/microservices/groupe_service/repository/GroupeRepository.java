package com.franto.microservices.groupe_service.repository;

import com.franto.microservices.groupe_service.model.Groupe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupeRepository extends JpaRepository <Groupe,Long>{
}
