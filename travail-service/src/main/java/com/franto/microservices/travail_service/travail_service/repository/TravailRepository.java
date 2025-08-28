package com.franto.microservices.travail_service.travail_service.repository;


import com.franto.microservices.travail_service.travail_service.model.Travail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TravailRepository extends JpaRepository<Travail, Long> {
}
